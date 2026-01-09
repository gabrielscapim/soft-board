import {
  AddFlexComponentsParams,
  BoardManagerI,
  DeleteFlexComponentsParams,
  UpdateFlexComponentsParams
} from './board-manager-interface'
import { BoardState } from '../board-state'
import { PromiseQueue } from '../promise-queue'
import { Client } from '@/client'
import { Command, CommandManager } from '../command-manager'
import { FlexComponent } from '@/types'

export type BoardManagerOptions = {
  client: Client
  boardState: BoardState
}

export class BoardManager implements BoardManagerI {
  private _client: Client
  private _boardState: BoardState
  private _promiseQueue: PromiseQueue
  private _commandManager = new CommandManager()

  constructor (options: BoardManagerOptions) {
    this._client = options.client
    this._boardState = options.boardState
    this._promiseQueue = new PromiseQueue()
  }

  addFlexComponents (params: AddFlexComponentsParams) {
    const { flexComponents } = params

    const prevFlexComponents = this._boardState.flexComponents
    const newFlexComponents = [...prevFlexComponents, ...flexComponents]

    const data = flexComponents.map(fc => ({
      name: fc.name,
      type: fc.type,
      properties: {
        ...fc.properties,
        x: Math.round(fc.properties.x),
        y: Math.round(fc.properties.y),
        width: Math.round(fc.properties.width),
        height: Math.round(fc.properties.height)
      },
      id: fc.id,
      connectionId: fc.connectionId,
      screenId: fc.screenId
    }))

    const command: Command = {
      do: () => {
        this._boardState.setFlexComponents(newFlexComponents)
        this._boardState.setSelectedFlexComponents(
          flexComponents.map(fc => fc.id)
        )

        return this._promiseQueue.run(() =>
          this._client.createComponents({
            boardId: this._boardState.id,
            components: data
          })
        )
      },

      undo: () => {
        this._boardState.setFlexComponents(prevFlexComponents)
        this._boardState.setSelectedFlexComponents(null)

        return this._promiseQueue.run(() =>
          this._client.deleteComponents({
            boardId: this._boardState.id,
            componentIds: flexComponents.map(fc => fc.id)
          })
        )
      }
    }

    this._commandManager.execute(command)
  }

  deleteFlexComponents (params: DeleteFlexComponentsParams) {
    const removed = this._boardState.flexComponents
      .filter(fc => params.flexComponents.includes(fc.id))

    const remaining = this._boardState.flexComponents
      .filter(fc => !params.flexComponents.includes(fc.id))

    const command: Command = {
      do: () => {
        this._boardState.setFlexComponents(remaining)
        this._boardState.setSelectedFlexComponents(null)

        return this._promiseQueue.run(() =>
          this._client.deleteComponents({
            boardId: this._boardState.id,
            componentIds: params.flexComponents
          })
        )
      },

      undo: () => {
        this._boardState.setFlexComponents([
          ...remaining,
          ...removed
        ])

        return this._promiseQueue.run(() =>
          this._client.createComponents({
            boardId: this._boardState.id,
            components: removed
          })
        )
      }
    }

    this._commandManager.execute(command)
  }

  updateFlexComponents (params: UpdateFlexComponentsParams) {
    const { updatedFlexComponents, initialProperties } = params

    const roundedComponents = updatedFlexComponents.map(c =>
      structuredClone({
        ...c,
        properties: {
          ...c.properties,
          x: Math.round(c.properties.x),
          y: Math.round(c.properties.y),
          width: Math.round(c.properties.width),
          height: Math.round(c.properties.height)
        }
      })
    )

    let previousComponents: FlexComponent[] = []

    if (initialProperties) {
      previousComponents = roundedComponents.map(component => {
        const initial = initialProperties.get(component.id)

        return {
          ...component,
          screenId: initial?.screenId ?? component.screenId,
          properties: {
            ...component.properties,
            x: initial?.x ?? component.properties.x,
            y: initial?.y ?? component.properties.y,
            width: initial?.width ?? component.properties.width,
            height: initial?.height ?? component.properties.height
          }
        }
      })
    } else {
      previousComponents = this._boardState.flexComponents
        .filter(fc => roundedComponents.some(u => u.id === fc.id))
        .map(fc => structuredClone(fc))
    }

    const newFlexComponents = this._boardState.flexComponents.map(fc => {
      const updated = roundedComponents.find(u => u.id === fc.id)
      return updated ?? fc
    })

    const command: Command = {
      do: () => {
        this._boardState.setFlexComponents(newFlexComponents)

        return this._promiseQueue.run(() =>
          this._client.updateComponents({
            boardId: this._boardState.id,
            components: roundedComponents
          })
        )
      },

      undo: () => {
        const restored = this._boardState.flexComponents.map(fc => {
          const prev = previousComponents.find(p => p.id === fc.id)
          return prev ?? fc
        })

        this._boardState.setFlexComponents(restored)

        return this._promiseQueue.run(() =>
          this._client.updateComponents({
            boardId: this._boardState.id,
            components: previousComponents
          })
        )
      }
    }

    this._commandManager.execute(command)
  }

  undo () {
    this._commandManager.undo()
  }

  redo () {
    this._commandManager.redo()
  }

  runAction (action: () => Promise<void>) {
    this._promiseQueue.run(action)
  }
}
