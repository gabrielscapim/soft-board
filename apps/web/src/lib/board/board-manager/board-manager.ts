import {
  AddSoftComponentsParams,
  BoardManagerI,
  DeleteSoftComponentsParams,
  UpdateSoftComponentsParams
} from './board-manager-interface'
import { BoardState } from '../board-state'
import { PromiseQueue } from '../promise-queue'
import { Client } from '@/client'
import { Command, CommandManager } from '../command-manager'
import { SoftComponent } from '@/types'

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

  addSoftComponents (params: AddSoftComponentsParams) {
    const { softComponents } = params

    const prevSoftComponents = this._boardState.softComponents
    const newSoftComponents = [...prevSoftComponents, ...softComponents]

    const data = softComponents.map(fc => ({
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
        this._boardState.setSoftComponents(newSoftComponents)
        this._boardState.setSelectedSoftComponents(
          softComponents.map(fc => fc.id)
        )

        return this._promiseQueue.run(() =>
          this._client.createComponents({
            boardId: this._boardState.id,
            components: data
          })
        )
      },

      undo: () => {
        this._boardState.setSoftComponents(prevSoftComponents)
        this._boardState.setSelectedSoftComponents(null)

        return this._promiseQueue.run(() =>
          this._client.deleteComponents({
            boardId: this._boardState.id,
            componentIds: softComponents.map(fc => fc.id)
          })
        )
      }
    }

    this._commandManager.execute(command)
  }

  deleteSoftComponents (params: DeleteSoftComponentsParams) {
    const previousSoftComponents = this._boardState.softComponents
      .map(fc => structuredClone(fc))

    const removed = previousSoftComponents
      .filter(fc => params.softComponents.includes(fc.id))

    const remaining = previousSoftComponents
      .filter(fc => !params.softComponents.includes(fc.id))
      .map(fc => ({
        ...fc,
        connectionId: removed.some(r => r.id === fc.connectionId) ? null : fc.connectionId,
        screenId: removed.some(r => r.id === fc.screenId) ? null : fc.screenId
      }))

    const command: Command = {
      do: () => {
        this._boardState.setSoftComponents(remaining)
        this._boardState.setSelectedSoftComponents(null)

        return this._promiseQueue.run(() =>
          this._client.deleteComponents({
            boardId: this._boardState.id,
            componentIds: params.softComponents
          })
        )
      },

      undo: () => {
        this._boardState.setSoftComponents(previousSoftComponents)

        return this._promiseQueue.run(() =>
          this._client.createComponents({
            boardId: this._boardState.id,
            components: removed.map(fc => ({
              name: fc.name,
              type: fc.type,
              id: fc.id,
              connectionId: fc.connectionId,
              screenId: fc.screenId,
              properties: fc.properties
            }))
          })
        )
      }
    }

    this._commandManager.execute(command)
  }

  updateSoftComponents (params: UpdateSoftComponentsParams) {
    const { updatedSoftComponents, initialProperties } = params

    const roundedComponents = updatedSoftComponents.map(c =>
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

    let previousComponents: SoftComponent[] = []

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
      previousComponents = this._boardState.softComponents
        .filter(fc => roundedComponents.some(u => u.id === fc.id))
        .map(fc => structuredClone(fc))
    }

    const newSoftComponents = this._boardState.softComponents.map(fc => {
      const updated = roundedComponents.find(u => u.id === fc.id)
      return updated ?? fc
    })

    const command: Command = {
      do: () => {
        this._boardState.setSoftComponents(newSoftComponents)

        return this._promiseQueue.run(() =>
          this._client.updateComponents({
            boardId: this._boardState.id,
            components: roundedComponents
          })
        )
      },

      undo: () => {
        const restored = this._boardState.softComponents.map(fc => {
          const prev = previousComponents.find(p => p.id === fc.id)
          return prev ?? fc
        })

        this._boardState.setSoftComponents(restored)

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
