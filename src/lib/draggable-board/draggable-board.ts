import { Offset } from '../../types'
import { UUID } from '../../types/common/uuid'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'

/**
 * Class responsible for leaving SVG components inside the board draggable.
 */
export class DraggableBoard {
  private _boardManager: BoardManager
  private _flexBoardElement: SVGSVGElement
  private _grid: number
  private _offset: Offset | undefined
  private _selectedFlexElement: SVGGElement | undefined
  private _transform: DOMMatrix | undefined

  constructor (
    boardState: BoardState,
    flexBoardElement: SVGSVGElement,
    grid: number = 10
  ) {
    this._boardManager = new BoardManager(boardState)
    this._flexBoardElement = flexBoardElement
    this._grid = grid

    this.startDrag = this.startDrag.bind(this)
    this.onDragging = this.onDragging.bind(this)
    this.endDrag = this.endDrag.bind(this)
  }

  private getMousePosition (event: MouseEvent) {
    const screenCTM = this._flexBoardElement.getScreenCTM()
    const x = screenCTM ? (event.clientX - screenCTM.e) / screenCTM.a : 0
    const y = screenCTM ? (event.clientY - screenCTM.f) / screenCTM.d : 0

    return { x, y }
  }

  public endDrag () {
    this._selectedFlexElement = undefined
  }

  public onDragging (event: MouseEvent) {
    if (this._selectedFlexElement && this._offset) {
      event.preventDefault()

      const coord = this.getMousePosition(event)
      const deltaX = coord.x - (this._offset.x ?? 0)
      const deltaY = coord.y - (this._offset.y ?? 0)
      const roundedDeltaX = Math.round(deltaX / this._grid) * this._grid
      const roundedDeltaY = Math.round(deltaY / this._grid) * this._grid

      this._boardManager.onDraggingFlexComponent({
        id: this._selectedFlexElement.id as UUID,
        properties: {
          roundedDeltaX,
          roundedDeltaY
        }
      })
    }
  }

  public startDrag (event: MouseEvent) {
    const target = event.target as SVGGElement
    const draggableGroupElement = target.closest('.draggable-group') as SVGGElement | null

    if (draggableGroupElement) {
      this._selectedFlexElement = draggableGroupElement
      this._offset = this.getMousePosition(event)
      this._transform = this._selectedFlexElement.transform.baseVal.consolidate()?.matrix
      this._boardManager.onStartDragFlexComponent({ id: this._selectedFlexElement.id as UUID })
      // this._flexBoardElement.appendChild(this._selectedFlexElement) // Move element to the first position

      if (this._transform) {
        this._offset.x -= this._transform.e
        this._offset.y -= this._transform.f
      }
    }

    if (!draggableGroupElement) {
      this._boardManager.onStartDragFlexComponent({})
    }
  }
}
