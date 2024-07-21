import { FlexComponent } from '../../types'
import { BoardState } from '../board-state'

/**
 * Class responsible for changing the attributes of the BoardState class.
 * Works between the BoardController and BoardState.
 */
export class BoardManager {
  addFlexComponent (boardState: BoardState, flexComponent: FlexComponent) {
    const prevFlexComponents = boardState.flexComponents
    const newFlexComponents = [...prevFlexComponents, flexComponent]

    boardState.flexComponents = newFlexComponents
  }
}
