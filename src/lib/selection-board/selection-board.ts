import { Offset } from '../../types'
import { BoardState } from '../board-state'

export class SelectionBoard {
  private boardState: BoardState
  private boardElement: HTMLElement
  private selectionBoxElement: HTMLElement
  private isSelecting: boolean = false
  private selectionStart: Offset = { x: 0, y: 0 }

  constructor (
    boardState: BoardState,
    boardElement: HTMLElement,
    selectionBoxElement: HTMLElement
  ) {
    this.boardState = boardState
    this.boardElement = boardElement
    this.selectionBoxElement = selectionBoxElement

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }

  private getMousePosition (event: MouseEvent): Offset {
    const rect = this.boardElement.getBoundingClientRect()

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }

  private updateSelection (selectionRect: { x: number; y: number; width: number; height: number }) {
    const selected = this.boardState.flexComponents
      .filter(flexComponent => {
        const { x, y, width, height } = flexComponent.properties

        return (
          x < selectionRect.x + selectionRect.width &&
          x + width > selectionRect.x &&
          y < selectionRect.y + selectionRect.height &&
          y + height > selectionRect.y
        )
      })
      .map(flexComponent => flexComponent.id)

    this.boardState.setSelectedFlexComponents(selected)
  }

  onMouseDown (event: MouseEvent) {
    const target = event.target as HTMLElement

    if (target.closest('.draggable-group') || target.closest('.resizer')) {
      return
    }

    this.isSelecting = true
    this.selectionStart = this.getMousePosition(event)
    this.selectionBoxElement.style.left = `${this.selectionStart.x}px`
    this.selectionBoxElement.style.top = `${this.selectionStart.y}px`
    this.selectionBoxElement.style.width = '0px'
    this.selectionBoxElement.style.height = '0px'
    this.selectionBoxElement.style.display = 'block'

    this.boardState.setSelectedFlexComponents([])
  }

  onMouseMove (event: MouseEvent) {
    if (!this.isSelecting) return

    const currentPos = this.getMousePosition(event)
    const left = Math.min(currentPos.x, this.selectionStart.x)
    const top = Math.min(currentPos.y, this.selectionStart.y)
    const width = Math.abs(currentPos.x - this.selectionStart.x)
    const height = Math.abs(currentPos.y - this.selectionStart.y)

    this.selectionBoxElement.style.left = `${left}px`
    this.selectionBoxElement.style.top = `${top}px`
    this.selectionBoxElement.style.width = `${width}px`
    this.selectionBoxElement.style.height = `${height}px`

    const selectionRect = { x: left, y: top, width, height }

    this.updateSelection(selectionRect)
  }

  onMouseUp (event: MouseEvent) {
    if (!this.isSelecting) return

    this.isSelecting = false
    this.selectionBoxElement.style.display = 'none'

    const currentPos = this.getMousePosition(event)
    const left = Math.min(currentPos.x, this.selectionStart.x)
    const top = Math.min(currentPos.y, this.selectionStart.y)
    const width = Math.abs(currentPos.x - this.selectionStart.x)
    const height = Math.abs(currentPos.y - this.selectionStart.y)
    const selectionRect = { x: left, y: top, width, height }

    this.updateSelection(selectionRect)
  }
}
