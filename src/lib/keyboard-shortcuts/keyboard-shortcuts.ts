import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'

export class KeyboardShortcuts {
  private _boardManager: BoardManager
  private _boardState: BoardState

  constructor (
    boardState: BoardState
  ) {
    this._boardManager = new BoardManager(boardState)
    this._boardState = boardState

    this.onKeyPressed = this.onKeyPressed.bind(this)
  }

  private onDeleteKeyPressed () {
    this._boardManager.onDeleteFlexComponents({ flexComponents: this._boardState.selectedFlexComponents ?? [] })
  }

  private onEscapeKeyPressed () {
    this._boardManager.onDeselectFlexComponents()
  }

  onKeyPressed (event: KeyboardEvent) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      this.onDeleteKeyPressed()
    }

    if (event.key === 'Escape') {
      this.onEscapeKeyPressed()
    }
  }
}
