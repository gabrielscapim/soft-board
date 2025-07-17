import {
  AddFlexComponentsParams,
  BoardManagerI,
  DeleteFlexComponentsParams,
  UpdateFlexComponentsParams
} from './board-manager-interface'
import { BoardState } from '../board-state'
import { PromiseQueue } from '../promise-queue'
import { Client } from '@/client'

export type BoardManagerOptions = {
  client: Client
  boardState: BoardState
}

export class BoardManager implements BoardManagerI {
  private _client: Client
  private _boardState: BoardState
  private _promiseQueue: PromiseQueue

  constructor (options: BoardManagerOptions) {
    this._client = options.client
    this._boardState = options.boardState
    this._promiseQueue = new PromiseQueue()
  }

  addFlexComponents (params: AddFlexComponentsParams) {
    const { flexComponents } = params

    const prevFlexComponents = this._boardState.flexComponents
    const newFlexComponents = [...prevFlexComponents, ...flexComponents]

    this._boardState.setFlexComponents(newFlexComponents)
    this._boardState.setSelectedFlexComponents(flexComponents.map(flexComponent => flexComponent.id))

    const data = flexComponents.map(flexComponent => ({
      name: flexComponent.name,
      type: flexComponent.type,
      properties: flexComponent.properties,
      id: flexComponent.id,
      connectionId: flexComponent.connectionId,
      screenId: flexComponent.screenId
    }))

    const action = this._client.createComponents({ boardId: this._boardState.id, components: data })
    this.runAction(() => action)
  }

  deleteFlexComponents (params: DeleteFlexComponentsParams) {
    const newFlexComponents = this._boardState.flexComponents
      .filter(flexComponent => !params.flexComponents.includes(flexComponent.id))

    this._boardState.setFlexComponents(newFlexComponents)
    this._boardState.setSelectedFlexComponents(null)

    const action = this._client.deleteComponents({ boardId: this._boardState.id, componentIds: params.flexComponents })
    this.runAction(() => action)
  }

  updateFlexComponents (params: UpdateFlexComponentsParams) {
    const { updatedFlexComponents } = params

    const newFlexComponents = this._boardState.flexComponents.map(flexComponent => {
      const updatedComponent = updatedFlexComponents.find(updated => updated.id === flexComponent.id)

      return updatedComponent ? updatedComponent : flexComponent
    })

    this._boardState.setFlexComponents(newFlexComponents)

    const action = this._client.updateComponents({ boardId: this._boardState.id, components: updatedFlexComponents })
    this.runAction(() => action)
  }

  runAction (action: () => Promise<void>) {
    this._promiseQueue.run(action)
  }
}
