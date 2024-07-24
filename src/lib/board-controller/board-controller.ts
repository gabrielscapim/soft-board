import { FLEX_COMPONENT_NAMES } from '../../flex-components/flex-component-names.ts'
import { UUID } from '../../types/common/uuid.ts'
import { FlexComponent, FlexComponentType, Offset } from '../../types/index.ts'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'
import { v4 as uuid } from 'uuid'

/**
 * Class responsible to communicate with the front-end and the BoardManager class.
 * Creating new objects and calling the BoardManager.
 */
export class BoardController {
  private _boardManager: BoardManager

  constructor (
    boardState: BoardState,
  ) {
    this._boardManager = new BoardManager(boardState)
  }

  onAddFlexComponent (type: FlexComponentType, position: Offset) {
    const flexComponent: FlexComponent = {
      id: uuid() as UUID,
      name: FLEX_COMPONENT_NAMES[type],
      type,
      properties: {
        x: position.x,
        y: position.y,
        width: 200,
        height: 100
      }
    }

    this._boardManager.addFlexComponent({ flexComponent })
  }
}
