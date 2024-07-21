import { FlexComponent } from '../../types/index.ts'
import { BoardState } from '../board-state.ts'

export class BoardController {
  private _boardState: BoardState

  constructor (boardState: BoardState) {
    this._boardState = boardState
  }

  onAddFlexComponent (flexComponent: FlexComponent) {
    const prevFlexComponents = this._boardState.flexComponents
    const newFlexComponents = [...prevFlexComponents, flexComponent]

    this._boardState.flexComponents = newFlexComponents
  }
}
