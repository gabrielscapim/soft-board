import { FlexComponent } from '../../types'

/**
 * The class to save the flex components and board configs.
 */
export class BoardState {
  private _flexComponents: FlexComponent[]

  constructor () {
    this._flexComponents = []
  }

  get flexComponents () {
    return this._flexComponents
  }

  set flexComponents (flexComponents: FlexComponent[]) {
    this._flexComponents = flexComponents
  }
}
