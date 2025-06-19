import { FlexComponent } from '../../types'
import { UUID } from '../../types/common/uuid'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'
import { v4 as uuid } from 'uuid'

export class KeyboardShortcuts {
  private _boardManager: BoardManager
  private _boardState: BoardState

  constructor (
    boardState: BoardState
  ) {
    this._boardManager = new BoardManager(boardState)
    this._boardState = boardState

    this.onCopyPressed = this.onCopyPressed.bind(this)
    this.onKeyPressed = this.onKeyPressed.bind(this)
    this.onPastePressed = this.onPastePressed.bind(this)
  }

  private onDeleteKeyPressed () {
    this._boardManager.onDeleteFlexComponents({ flexComponents: this._boardState.selectedFlexComponents ?? [] })
  }

  private onEscapeKeyPressed () {
    this._boardManager.onDeselectFlexComponents()
  }

  onCopyPressed (event: ClipboardEvent) {
    event.preventDefault()
    event.stopPropagation()

    const selectedFlexComponents = this._boardState.selectedFlexComponents

    if (!selectedFlexComponents || selectedFlexComponents.length === 0) {
      return
    }

    event.clipboardData?.setData('text/plain', JSON.stringify(selectedFlexComponents))
  }

  onKeyPressed (event: KeyboardEvent) {
    if (event.key === 'Delete') {
      this.onDeleteKeyPressed()
    }

    if (event.key === 'Escape') {
      this.onEscapeKeyPressed()
    }
  }

  onPastePressed (event: ClipboardEvent) {
    event.preventDefault()
    event.stopPropagation()

    const clipboardData = event.clipboardData?.getData('text')
    const currentFlexComponents = this._boardState.flexComponents

    if (!clipboardData) {
      return
    }

    const copiedFlexComponents: UUID[] = JSON.parse(clipboardData)

    if (!Array.isArray(copiedFlexComponents)) {
      return
    }

    const newFlexComponents = currentFlexComponents
      .filter(flexComponent => copiedFlexComponents.includes(flexComponent.id))
      .map<FlexComponent>(flexComponent => ({
        ...flexComponent,
        id: uuid() as UUID,
        connection: null
      }))

    this._boardManager.addFlexComponents({ flexComponents: newFlexComponents })
  }
}
