import { SoftComponent } from '../../../types'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'
import { v4 as uuid } from 'uuid'
import { CopiedSoftComponent } from './types'

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

  private isEditableElement (target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) {
      return false
    }

    const tagName = target.tagName.toLowerCase()

    return (
      tagName === 'input' ||
      tagName === 'textarea' ||
      target.isContentEditable
    )
  }

  private onDeleteKeyPressed () {
    this._boardManager.deleteSoftComponents({ softComponents: this._boardState.selectedSoftComponents ?? [] })
  }

  private onEscapeKeyPressed () {
    this._boardState.setSelectedSoftComponents(null)
  }

  onCopyPressed (event: ClipboardEvent) {
    event.preventDefault()
    event.stopPropagation()

    const selectedSet = new Set(this._boardState.selectedSoftComponents)

    if (selectedSet.size === 0) {
      return
    }

    const selected = this._boardState.softComponents.filter(softComponent =>
      selectedSet.has(softComponent.id)
    )

    const copied: CopiedSoftComponent[] = []

    for (const component of selected) {
      if (component.type === 'mobileScreen') {
        const children = this._boardState.softComponents.filter(
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
    if (this.isEditableElement(event.target)) {
      return
    }

    const isMac = navigator.platform.toUpperCase().includes('MAC')
    const modKey = isMac ? event.metaKey : event.ctrlKey

    // UNDO → Cmd/Ctrl + Z
    if (modKey && event.key.toLowerCase() === 'z' && !event.shiftKey) {
      event.preventDefault()
      this._boardManager.undo()
    }

    // REDO → Cmd + Shift + Z (Mac) | Ctrl + Y (Windows)
    if (
      (modKey && event.shiftKey && event.key.toLowerCase() === 'z') ||
      (!isMac && event.ctrlKey && event.key.toLowerCase() === 'y')
    ) {
      event.preventDefault()
      this._boardManager.redo()
    }

    if (event.key === 'Delete' || event.key === 'Backspace') {
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

    let copied: CopiedSoftComponent[]

    try {
      copied = JSON.parse(clipboardData)
    } catch {
      return
    }

    if (!Array.isArray(copied)) {
      return
    }

    const newSoftComponents: SoftComponent[] = []

    const cloneComponent = (
      component: CopiedSoftComponent,
      parentScreenId?: string
    ): SoftComponent => {
      const newId = uuid() as string

      const cloned: SoftComponent = {
        ...component,
        id: newId,
        connectionId: null,
        screenId: parentScreenId ?? component.screenId ?? null
      }

      newSoftComponents.push(cloned)

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

    this._boardManager.addSoftComponents({ softComponents: newSoftComponents })
  }
}
