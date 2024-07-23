import { Offset } from '../../types'
import { UUID } from '../../types/common/uuid'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'

export class ElementResizer {
  private _boardManager: BoardManager
  private _flexBoardElement: SVGSVGElement
  private _grid: number
  private _offset: Offset | undefined
  private _selectedResizerElement: SVGGElement | undefined
  private _transform: DOMMatrix | undefined

  constructor (
    boardState: BoardState,
    flexBoardElement: SVGSVGElement,
    grid: number = 10
  ) {
    this._boardManager = new BoardManager(boardState)
    this._flexBoardElement = flexBoardElement
    this._grid = grid
  }

  private getMousePosition (event: MouseEvent) {
    const screenCTM = this._flexBoardElement.getScreenCTM()
    const x = screenCTM ? (event.clientX - screenCTM.e) / screenCTM.a : 0
    const y = screenCTM ? (event.clientY - screenCTM.f) / screenCTM.d : 0

    return { x, y }
  }

  public endResize () {
    this._selectedResizerElement = undefined
  }

  public onResizing (event: MouseEvent) {
    if (this._selectedResizerElement && this._offset) {
      event.preventDefault()

      const coord = this.getMousePosition(event)
      const deltaX = coord.x - (this._offset.x ?? 0)
      const deltaY = coord.y - (this._offset.y ?? 0)
      const roundedDeltaX = Math.round(deltaX / this._grid) * this._grid
      const roundedDeltaY = Math.round(deltaY / this._grid) * this._grid

      this._boardManager.onResizingFlexComponent({
        roundedDeltaX,
        roundedDeltaY
      })
    }
  }

  public startResize (event: MouseEvent) {
    const target = event.target as SVGGElement
    const resizerElement = target.closest('.resizer') as SVGEllipseElement | null

    if (resizerElement) {
      this._selectedResizerElement = resizerElement
      this._offset = this.getMousePosition(event)
      this._transform = resizerElement.transform.baseVal.consolidate()?.matrix
      this._boardManager.onStartDragFlexComponent({ id: resizerElement.id as UUID })

      if (this._transform) {
        this._offset.x -= this._transform.e
        this._offset.y -= this._transform.f
      }
    }
  }
}
