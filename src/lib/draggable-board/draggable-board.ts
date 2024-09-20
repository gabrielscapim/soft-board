import { Offset } from '../../types'
import { UUID } from '../../types/common/uuid'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'

/**
 * Class responsible to turn components inside the board draggable.
 */
export class DraggableBoard {
  private _boardManager: BoardManager
  private _boardState: BoardState
  private _boardElement: HTMLElement
  private _offset: Offset | undefined
  private _selectedElement: HTMLDivElement | undefined

  constructor (
    boardState: BoardState,
    boardElement: HTMLElement
  ) {
    this._boardManager = new BoardManager(boardState)
    this._boardState = boardState
    this._boardElement = boardElement

    this.startDrag = this.startDrag.bind(this)
    this.onDragging = this.onDragging.bind(this)
    this.endDrag = this.endDrag.bind(this)
  }

  private getMousePosition (event: MouseEvent) {
    const rect = this._boardElement.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    return { x, y }
  }

  public endDrag () {
    this._selectedElement = undefined
  }

  public onDragging (event: MouseEvent) {
    if (this._selectedElement && this._offset) {
      event.preventDefault()

      const grid = this._boardState.grid
      const coord = this.getMousePosition(event)
      const deltaX = (coord.x - (this._offset.x ?? 0)) / this._boardState.scale
      const deltaY = (coord.y - (this._offset.y ?? 0)) / this._boardState.scale
      const roundedDeltaX = Math.round(deltaX / grid) * grid
      const roundedDeltaY = Math.round(deltaY / grid) * grid

      this._boardManager.onDraggingFlexComponent({
        id: this._selectedElement.id as UUID,
        properties: {
          roundedDeltaX,
          roundedDeltaY
        }
      })
    }
  }

  public startDrag (event: MouseEvent) {
    const target = event.target as HTMLDivElement
    const draggableGroupElement = target.closest('.draggable-group') as HTMLDivElement | null
    const resizerElement = target.closest('.resizer') as HTMLDivElement | null

    if (draggableGroupElement) {
      this._selectedElement = draggableGroupElement
      this._offset = this.getMousePosition(event)
      this._boardManager.onStartDragFlexComponent({ id: draggableGroupElement.id as UUID })
    }

    if (!draggableGroupElement && !resizerElement) {
      this._boardManager.onStartDragFlexComponent({ id: null })
    }
  }
}
