import { FlexComponent } from '../../types'

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
