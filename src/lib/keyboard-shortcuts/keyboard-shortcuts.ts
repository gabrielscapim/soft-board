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
    const selectedComponents = this._boardState.selectedFlexComponents

    if (selectedComponents?.length) {
      this._boardManager.onDeleteFlexComponents({ flexComponents: selectedComponents })
    }
  }

  onKeyPressed (event: KeyboardEvent) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      this.onDeleteKeyPressed()
    }
  }
}
