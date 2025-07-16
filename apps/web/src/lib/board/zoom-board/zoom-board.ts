import { MAX_SCALE, MIN_SCALE, ZOOM_SPEED } from '../../../helpers'
import Cursor from '/cursor.png'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'

export class ZoomBoard {
  private _boardManager: BoardManager
  private _boardState: BoardState
  private _startX: number
  private _startY: number
  private _flexBoardContainer: HTMLElement | undefined

  constructor (
    boardState: BoardState,
    flexBoardContainer: HTMLElement
  ) {
    this._boardManager = new BoardManager(boardState)
    this._boardState = boardState
    this._startX = 0
    this._startY = 0
    this._flexBoardContainer = flexBoardContainer

    this.applyZoom = this.applyZoom.bind(this)
    this.endMove = this.endMove.bind(this)
    this.moveBoard = this.moveBoard.bind(this)
    this.startBoardMove = this.startBoardMove.bind(this)
  }

  public applyZoom = (event: WheelEvent) => {
    event.preventDefault()

    if (!this._flexBoardContainer) return

    const rect = this._flexBoardContainer.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    if (event.ctrlKey || event.metaKey) {
      const newScale = Math.min(Math.max(this._boardState.scale + event.deltaY *- ZOOM_SPEED, MIN_SCALE), MAX_SCALE)
      const scaleChange = newScale / this._boardState.scale
      const translateX = mouseX - (mouseX - this._boardState.translate.x) * scaleChange
      const translateY = mouseY - (mouseY - this._boardState.translate.y) * scaleChange

      this._boardManager.onTranslateBoard({ translateX, translateY })
      this._boardManager.onScaleChange({ scale: newScale })
      return
    }

    const translateX = this._boardState.translate.x - event.deltaX
    const translateY = this._boardState.translate.y - event.deltaY
    this._boardManager.onTranslateBoard({ translateX, translateY })
  }

  public endMove = () => {
    if (!this._flexBoardContainer) return

    this._boardManager.onChangeBoardMoving({ isBoardMoving: false })
    this._flexBoardContainer.style.cursor = `url(${Cursor}) 0 0, auto`
  }

  public moveBoard = (event: MouseEvent) => {
    if (!this._boardState.isBoardMoving) return

    const deltaX = event.clientX - this._startX
    const deltaY = event.clientY - this._startY
    const translateX = this._boardState.translate.x + deltaX
    const translateY = this._boardState.translate.y + deltaY

    this._startX = event.clientX
    this._startY = event.clientY
    this._boardManager.onTranslateBoard({ translateX, translateY })
  }

  public startBoardMove = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement

    if (!clickedElement?.id?.includes('grid')) return

    if (event.button === 1 && this._flexBoardContainer) {
      this._boardManager.onChangeBoardMoving({ isBoardMoving: true })
      this._startX = event.clientX
      this._startY = event.clientY
      this._flexBoardContainer.style.cursor = 'grabbing'
    }
  }
}
