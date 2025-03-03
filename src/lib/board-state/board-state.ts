import { BoardEvent, BoardEventListener, FlexComponent } from '../../types'
import { UUID } from '../../types/common/uuid'

/**
 * The class which contains the flex components and board configs.
 */
export class BoardState {
  private _boardListeners: Record<string, BoardEventListener[]>
  private _flexComponents: FlexComponent[]
  private _grid: number
  private _guides: { vertical: { lineGuide: number, offset: number }[], horizontal: { lineGuide: number, offset: number }[] }
  private _isBoardMoving: boolean
  private _isDragging: boolean
  private _scale: number
  private _selectedFlexComponents: UUID[] | null
  private _translate: { x: number, y: number }

  constructor () {
    this._boardListeners = {}
    this._flexComponents = []
    this._grid = 1
    this._guides = { vertical: [], horizontal: [] }
    this._isBoardMoving = false
    this._isDragging = false
    this._scale = 1
    this._selectedFlexComponents = null
    this._translate = { x: 0, y: 0 }
  }

  get flexComponents () {
    return this._flexComponents
  }

  get grid () {
    return this._grid
  }

  get guides () {
    return this._guides
  }

  get isBoardMoving () {
    return this._isBoardMoving
  }

  get isDragging () {
    return this._isDragging
  }

  get scale () {
    return this._scale
  }

  get selectedFlexComponents () {
    return this._selectedFlexComponents
  }

  get translate () {
    return this._translate
  }

  setFlexComponents (flexComponents: FlexComponent[]) {
    this._flexComponents = flexComponents
    this.runListener('flexComponentsChanged')
  }

  setGuides (guides: { vertical: { lineGuide: number, offset: number }[], horizontal: { lineGuide: number, offset: number }[] }) {
    this._guides = guides
    this.runListener('guidesChanged')
  }

  setIsBoardMoving (isBoardMoving: boolean) {
    this._isBoardMoving = isBoardMoving
    this.runListener('isBoardMovingChanged')
  }

  setIsDragging (isDragging: boolean) {
    this._isDragging = isDragging
    this.runListener('isDraggingChanged')
  }

  setScale (scale: number) {
    this._scale = scale
    this.runListener('scaleChanged')
  }

  setSelectedFlexComponents (selectedFlexComponents: UUID[] | null) {
    this._selectedFlexComponents = selectedFlexComponents
    this.runListener('selectedFlexComponentsChanged')
  }

  setTranslate (translate: { x: number, y: number }) {
    this._translate = translate
    this.runListener('translateChanged')
  }

  addListener (event: BoardEvent, listener: BoardEventListener) {
    if (!this._boardListeners[event]) {
      this._boardListeners[event] = []
    }

    if (!this._boardListeners[event].includes(listener)) {
      this._boardListeners[event].push(listener)
    }
  }

  removeListener (event: BoardEvent, listener: BoardEventListener) {
    if (this._boardListeners[event]) {
      this._boardListeners[event] = this._boardListeners[event].filter(boardListener => boardListener !== listener)
    }
  }

  private runListener (event: BoardEvent) {
    const listeners = this._boardListeners[event]

    if (listeners) {
      for (const listener of listeners) {
        listener()
      }
    }
  }
}
