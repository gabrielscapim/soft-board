import { FlexComponent } from '../../types'
import { UUID } from '../../types/common/uuid'
import { BoardState } from '../board-state'

/**
 * Class responsible for changing the attributes of the BoardState class.
 */
export class BoardManager {
  private _boardState: BoardState

  constructor (boardState: BoardState) {
    this._boardState = boardState
  }

  addFlexComponent (flexComponent: FlexComponent) {
    const prevFlexComponents = this._boardState.flexComponents
    const newFlexComponents = [...prevFlexComponents, flexComponent]

    this._boardState.setFlexComponents(newFlexComponents)
    this._boardState.setSelectedFlexComponent(null)
  }

  onDragFlexComponent (id?: UUID) {
    const draggedFlexComponent = this._boardState.flexComponents.find(flexComponent => flexComponent.id === id)

    if (draggedFlexComponent) {
      this._boardState.setSelectedFlexComponent(draggedFlexComponent)
      return
    }

    this._boardState.setSelectedFlexComponent(null)
  }
}
