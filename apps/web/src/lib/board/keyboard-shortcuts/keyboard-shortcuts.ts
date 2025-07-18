import { FlexComponent } from '../../../types'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'
import { v4 as uuid } from 'uuid'

export type BoardShortcutsOptions = {
  boardState: BoardState
  boardManager: BoardManager
}

export class KeyboardShortcuts {
  private _boardManager: BoardManager
  private _boardState: BoardState

  constructor (options: BoardShortcutsOptions) {
    this._boardManager = options.boardManager
    this._boardState = options.boardState

    this.onCopyPressed = this.onCopyPressed.bind(this)
    this.onKeyPressed = this.onKeyPressed.bind(this)
    this.onPastePressed = this.onPastePressed.bind(this)
  }

  private onDeleteKeyPressed () {
    this._boardManager.deleteFlexComponents({ flexComponents: this._boardState.selectedFlexComponents ?? [] })
  }

  private onEscapeKeyPressed () {
    this._boardState.setSelectedFlexComponents(null)
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

    const copiedFlexComponents: string[] = JSON.parse(clipboardData)

    if (!Array.isArray(copiedFlexComponents)) {
      return
    }

    const newFlexComponents = currentFlexComponents
      .filter(flexComponent => copiedFlexComponents.includes(flexComponent.id))
      .map<FlexComponent>(flexComponent => ({
        ...flexComponent,
        id: uuid() as string,
        connection: null
      }))

    this._boardManager.addFlexComponents({ flexComponents: newFlexComponents })
  }
}
