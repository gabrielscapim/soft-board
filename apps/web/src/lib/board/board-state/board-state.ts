import { FLEX_COMPONENTS_SCHEMAS } from '@/flex-components'
import { BoardEvent, BoardEventListener, FlexComponent, Guide } from '../../../types'

export type BoardStateOptions = {
  id?: string
}

export class BoardState {
  private _id: string
  private _boardListeners: Record<string, BoardEventListener[]>
  private _flexComponents: FlexComponent[]
  private _grid: number
  private _guides: { vertical: Guide[], horizontal: Guide[] }
  private _isBoardMoving: boolean
  private _isDragging: boolean
  private _isResizing: boolean
  private _scale: number
  private _selectedFlexComponents: string[] | null
  private _translate: { x: number, y: number }

  constructor (options: BoardStateOptions = {}) {
    this._id = options.id || 'default-board-id'
    this._boardListeners = {}
    this._flexComponents = [
      {
        id: '1',
        type: 'button',
        properties: FLEX_COMPONENTS_SCHEMAS.button.variations[0].properties,
        name: FLEX_COMPONENTS_SCHEMAS.button.variations[0].name,
      }
    ]
    this._grid = 1
    this._guides = { vertical: [], horizontal: [] }
    this._isBoardMoving = false
    this._isDragging = false
    this._isResizing = false
    this._scale = 1
    this._selectedFlexComponents = null
    this._translate = { x: 0, y: 0 }
  }

  get id () {
    return this._id
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

  get isResizing () {
    return this._isResizing
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

  setGuides (guides: { vertical: Guide[], horizontal: Guide[] }) {
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

  setIsResizing (isResizing: boolean) {
    this._isResizing = isResizing
    this.runListener('isResizingChanged')
  }

  setScale (scale: number) {
    this._scale = scale
    this.runListener('scaleChanged')
  }

  setSelectedFlexComponents (selectedFlexComponents: string[] | null) {
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
