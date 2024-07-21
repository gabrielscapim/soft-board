import { Offset } from '../../types'

/**
 * Class responsible for leaving SVG components inside the board draggable.
 */
export class DraggableBoard {
  private _flexBoard: SVGSVGElement
  private _grid: number
  private _offset: Offset | undefined
  private _selectedFlexComponent: SVGGElement | undefined
  private _transform: DOMMatrix | undefined

  constructor (
    flexBoard: SVGSVGElement,
    grid: number = 10
  ) {
    this._flexBoard = flexBoard
    this._grid = grid

    this.startDrag = this.startDrag.bind(this)
    this.onDragging = this.onDragging.bind(this)
    this.endDrag = this.endDrag.bind(this)
  }

  private getMousePosition (event: MouseEvent) {
    const screenCTM = this._flexBoard.getScreenCTM()
    const x = screenCTM ? (event.clientX - screenCTM.e) / screenCTM.a : 0
    const y = screenCTM ? (event.clientY - screenCTM.f) / screenCTM.d : 0

    return { x, y }
  }

  public endDrag () {
    this._selectedFlexComponent = undefined
  }

  public onDragging (event: MouseEvent) {
    if (this._selectedFlexComponent && this._offset) {
      event.preventDefault()

      const coord = this.getMousePosition(event)
      const deltaX = coord.x - (this._offset.x ?? 0)
      const deltaY = coord.y - (this._offset.y ?? 0)
      const roundedDeltaX = Math.round(deltaX / this._grid) * this._grid
      const roundedDeltaY = Math.round(deltaY / this._grid) * this._grid

      this._selectedFlexComponent.setAttribute('transform', `translate(${roundedDeltaX}, ${roundedDeltaY})`)
    }
  }

  public startDrag (event: MouseEvent) {
    const target = event.target as SVGGElement

    if (target.closest('#draggable-group')) {
      this._selectedFlexComponent = target.closest('#draggable-group') as SVGGElement
      this._offset = this.getMousePosition(event)
      this._transform = this._selectedFlexComponent.transform.baseVal.consolidate()?.matrix

      this._flexBoard.appendChild(this._selectedFlexComponent) // Move element to the first position

      if (this._transform) {
        this._offset.x -= this._transform.e
        this._offset.y -= this._transform.f
      }
    }
  }
}
