import { FlexComponent } from '../../../types'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'
import { v4 as uuid } from 'uuid'
import { CopiedFlexComponent } from './types'

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

    const selectedSet = new Set(this._boardState.selectedFlexComponents)

    if (selectedSet.size === 0) {
      return
    }

    const selected = this._boardState.flexComponents.filter(flexComponent =>
      selectedSet.has(flexComponent.id)
    )

    const copied: CopiedFlexComponent[] = []

    for (const component of selected) {
      if (component.type === 'mobileScreen') {
        const children = this._boardState.flexComponents.filter(
          child => child.screenId === component.id
        )
        copied.push({ ...component, children })
      } else {
        copied.push({ ...component })
      }
    }

    event.clipboardData?.setData('text/plain', JSON.stringify(copied))
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

    if (!clipboardData) {
      return
    }

    let copied: CopiedFlexComponent[]

    try {
      copied = JSON.parse(clipboardData)
    } catch {
      return
    }

    if (!Array.isArray(copied)) {
      return
    }

    const newFlexComponents: FlexComponent[] = []

    const cloneComponent = (
      component: CopiedFlexComponent,
      parentScreenId?: string
    ): FlexComponent => {
      const newId = uuid() as string

      const cloned: FlexComponent = {
        ...component,
        id: newId,
        connectionId: null,
        screenId: parentScreenId ?? component.screenId ?? null
      }

      newFlexComponents.push(cloned)

      if (component.type === 'mobileScreen' && component.children) {
        for (const child of component.children) {
          cloneComponent(child, newId)
        }
      }

      return cloned
    }

    for (const component of copied) {
      cloneComponent(component)
    }

    this._boardManager.addFlexComponents({ flexComponents: newFlexComponents })
  }
}
