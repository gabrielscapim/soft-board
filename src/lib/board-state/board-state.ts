import { BoardEvent, FlexComponent } from '../../types'

/**
 * The class which contains the flex components and board configs.
 */
export class BoardState {
  private _boardListeners: Partial<Record<BoardEvent, () => void>>
  private _flexComponents: FlexComponent[]

  constructor () {
    this._flexComponents = []
    this._boardListeners = {}
  }

  get flexComponents () {
    return this._flexComponents
  }

  setFlexComponents (flexComponents: FlexComponent[]) {
    this._flexComponents = flexComponents
    this.runListener('flexComponentsChanged')
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
