import { FLEX_COMPONENT_NAMES } from '../../flex-components/flex-component-names.ts'
import { UUID } from '../../types/common/uuid.ts'
import { FlexComponent } from '../../types/index.ts'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'
import { v4 as uuid } from 'uuid'
import { BoardControllerInterface, OnAddFlexComponentParams, OnUpdateFlexComponentPropertiesParams } from './board-controller-interface.ts'

/**
 * Class responsible to communicate with the front-end and the BoardManager class.
 * Creating new objects and calling the BoardManager.
 */
export class BoardController implements BoardControllerInterface {
  private _boardManager: BoardManager

  constructor (
    boardState: BoardState,
  ) {
    this._boardManager = new BoardManager(boardState)
  }

  onAddFlexComponent (params: OnAddFlexComponentParams) {
    const { type, position } = params

    const flexComponent: FlexComponent = {
      id: uuid() as UUID,
      name: FLEX_COMPONENT_NAMES[type],
      type,
      properties: {
        x: position.x,
        y: position.y,
        width: 100,
        height: 50
      }
    }

    this._boardManager.addFlexComponent({ flexComponent })
  }

  onUpdateFlexComponentProperties (params: OnUpdateFlexComponentPropertiesParams): void {
    const { flexComponent, properties } = params

    const updatedFlexComponent: FlexComponent = {
      ...flexComponent,
      properties
    }

    this._boardManager.updateFlexComponentProperties({ updatedFlexComponent })
  }
}
