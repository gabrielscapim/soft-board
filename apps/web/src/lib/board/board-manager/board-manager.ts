import {
  AddFlexComponentsParams,
  BoardManagerI,
  DeleteFlexComponentsParams,
  UpdateFlexComponentParams
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

  updateFlexComponent (params: UpdateFlexComponentParams) {
    const { updatedFlexComponent } = params

    const newFlexComponents = this._boardState.flexComponents.map(flexComponent => {
      if (flexComponent.id === updatedFlexComponent.id) {
        return updatedFlexComponent
      }

      return flexComponent
    })

    this._boardState.setFlexComponents(newFlexComponents)
  }
}
