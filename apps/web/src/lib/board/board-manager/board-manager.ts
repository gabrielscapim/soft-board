import {
  AddFlexComponentsParams,
  BoardManagerI,
  DeleteFlexComponentsParams,
  UpdateFlexComponentsParams
} from './board-manager-interface'
import { BoardState } from '../board-state'
export class BoardManager implements BoardManagerI {
  private _boardState: BoardState

  constructor (boardState: BoardState) {
    this._boardState = boardState
  }

  addFlexComponents (params: AddFlexComponentsParams) {
    const { flexComponents } = params

    const prevFlexComponents = this._boardState.flexComponents
    const newFlexComponents = [...prevFlexComponents, ...flexComponents]

    this._boardState.setFlexComponents(newFlexComponents)
    this._boardState.setSelectedFlexComponents(flexComponents.map(flexComponent => flexComponent.id))
  }

  deleteFlexComponents (params: DeleteFlexComponentsParams) {
    const newFlexComponents = this._boardState.flexComponents
      .filter(flexComponent => !params.flexComponents.includes(flexComponent.id))

    this._boardState.setFlexComponents(newFlexComponents)
    this._boardState.setSelectedFlexComponents(null)
  }

  updateFlexComponents (params: UpdateFlexComponentsParams) {
    const { updatedFlexComponents } = params

    const newFlexComponents = this._boardState.flexComponents.map(flexComponent => {
      const updatedComponent = updatedFlexComponents.find(updated => updated.id === flexComponent.id)

      return updatedComponent ? updatedComponent : flexComponent
    })

    this._boardState.setFlexComponents(newFlexComponents)
  }
}
