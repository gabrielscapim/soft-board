import { BoardEvent, BoardEventListener, FlexComponent } from '../../types'

/**
 * The class which contains the flex components and board configs.
 */
export class BoardState {
  private _boardListeners: Record<string, BoardEventListener[]>
  private _flexComponents: FlexComponent[]
  private _grid: number
  private _selectedFlexComponent: FlexComponent | null

  constructor () {
    this._boardListeners = {}
    this._flexComponents = []
    this._grid = 10
    this._selectedFlexComponent = null
  }

  get flexComponents () {
    return this._flexComponents
  }

  get grid () {
    return this._grid
  }

  get selectedFlexComponent () {
    return this._selectedFlexComponent
  }

  setFlexComponents (flexComponents: FlexComponent[]) {
    this._flexComponents = flexComponents
    this.runListener('flexComponentsChanged')
  }

  setSelectedFlexComponent (selectedFlexComponent: FlexComponent | null) {
    this._selectedFlexComponent = selectedFlexComponent
    this.runListener('selectedFlexComponentChanged')
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
