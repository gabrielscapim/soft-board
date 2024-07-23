import { BoardEvent, FlexComponent } from '../../types'

/**
 * The class which contains the flex components and board configs.
 */
export class BoardState {
  private _boardListeners: Partial<Record<BoardEvent, () => void>>
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

  addListener (event: BoardEvent, listener: () => void) {
    this._boardListeners[event] = listener
  }

  removeListener (event: BoardEvent) {
    if (this._boardListeners[event]) {
      delete this._boardListeners[event]
    }
  }

  private runListener (event: BoardEvent) {
    const listener = this._boardListeners[event]
    if (listener) {
      listener()
    }
  }
}
