import { FlexComponent } from '../../types'
import { BoardState } from '../board-state'

/**
 * Class responsible for changing the attributes of the BoardState class.
 * Works between the BoardController and BoardState.
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
  }
}
