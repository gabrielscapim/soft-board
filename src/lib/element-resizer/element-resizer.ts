import { Offset, ResizeDirection } from '../../types'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'

export class ElementResizer {
  private _boardManager: BoardManager
  private _boardState: BoardState
  private _resizeDirection: ResizeDirection | undefined
  private _boardElement: HTMLElement
  private _offset: Offset | undefined
  private _selectedResizerElement: HTMLElement | undefined
  private _transform: DOMMatrix | undefined

  constructor (
    boardState: BoardState,
    boardElement: HTMLElement
  ) {
    this._boardManager = new BoardManager(boardState)
    this._boardState = boardState
    this._boardElement = boardElement

    this.startResize = this.startResize.bind(this)
    this.onResizing = this.onResizing.bind(this)
    this.endResize = this.endResize.bind(this)
  }

  private getMousePosition (event: MouseEvent) {
    const rect = this._boardElement.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    return { x, y }
  }

  public endResize () {
    this._selectedResizerElement = undefined
  }

  public onResizing (event: MouseEvent) {
    if (!this._selectedResizerElement || !this._offset) return

    event.preventDefault()

    const grid = this._boardState.grid
    const coord = this.getMousePosition(event)
    const params = {
      dimension: {
        roundedDeltaX: 0,
        roundedDeltaY: 0
      },
      position: {
        roundedDeltaX: 0,
        roundedDeltaY: 0
      }
    }
    const deltaX = (coord.x - (this._offset.x ?? 0)) / this._boardState.scale
    const deltaY = (coord.y - (this._offset.y ?? 0)) / this._boardState.scale
    const roundedDeltaX = Math.round(deltaX / grid) * grid
    const roundedDeltaY = Math.round(deltaY / grid) * grid

    switch (this._resizeDirection) {
      case 'n': // movimenta
        params.dimension.roundedDeltaY = -roundedDeltaY
        params.position.roundedDeltaY = roundedDeltaY
        break
      case 'ne': // movimenta
        params.dimension.roundedDeltaY = -roundedDeltaY
        params.dimension.roundedDeltaX = roundedDeltaX
        params.position.roundedDeltaY = roundedDeltaY
        break
      case 'e':
        params.dimension.roundedDeltaX = roundedDeltaX
        break
      case 'se':
        params.dimension.roundedDeltaX = roundedDeltaX
        params.dimension.roundedDeltaY = roundedDeltaY
        break
      case 's':
        params.dimension.roundedDeltaY = roundedDeltaY
        break
      case 'sw': // movimenta
        params.dimension.roundedDeltaY = roundedDeltaY
        params.dimension.roundedDeltaX = -roundedDeltaX
        params.position.roundedDeltaX = roundedDeltaX
        break
      case 'w': // movimenta
        params.dimension.roundedDeltaX = -roundedDeltaX
        params.position.roundedDeltaX = roundedDeltaX
        break
      case 'nw': // movimenta
        params.dimension.roundedDeltaY = -roundedDeltaY
        params.dimension.roundedDeltaX = -roundedDeltaX
        params.position.roundedDeltaX = roundedDeltaX
        params.position.roundedDeltaY = roundedDeltaY
        break
    }

    this._boardManager.onResizingFlexComponent(params)
  }

  public startResize (event: MouseEvent) {
    const target = event.target as HTMLElement
    const resizerElement = target.closest('.resizer') as HTMLElement | null

    if (resizerElement) {
      this._selectedResizerElement = resizerElement
      this._offset = this.getMousePosition(event)
      this._boardManager.onStartResizeFlexComponent()
      this._resizeDirection = resizerElement.id as ResizeDirection

      const transformStyle = window.getComputedStyle(resizerElement).transform
      this._transform = transformStyle !== 'none' ? new DOMMatrix(transformStyle) : undefined

      if (this._transform) {
        this._offset.x -= this._transform.e
        this._offset.y -= this._transform.f
      }
    }
  }
}
