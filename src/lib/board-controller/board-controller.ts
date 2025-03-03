import { UUID } from '../../types/common/uuid.ts'
import { ButtonFlexComponent, DividerFlexComponent, InputFlexComponent, MobileScreenFlexComponent, RectangleFlexComponent, SelectFlexComponent, TextFlexComponent } from '../../types/index.ts'
import { BoardManager } from '../board-manager'
import { BoardState } from '../board-state'
import { v4 as uuid } from 'uuid'
import { BoardControllerInterface, OnAddFlexComponentParams, OnChangeBoardScaleParams, OnUpdateFlexComponentParams } from './board-controller-interface.ts'

/**
 * Class responsible to communicate with the front-end and the BoardManager class.
 * Creating new objects and calling the BoardManager.
 */
export class BoardController implements BoardControllerInterface {
  private _boardManager: BoardManager
  private _boardState: BoardState

  constructor (
    boardState: BoardState,
  ) {
    this._boardManager = new BoardManager(boardState)
    this._boardState = boardState
  }

  onAddFlexComponent (params: OnAddFlexComponentParams) {
    const { type, position } = params

    if (type === 'button') {
      const button: ButtonFlexComponent = {
        id: uuid() as UUID,
        name: 'Button',
        type: 'button',
        properties: {
          x: position.x,
          y: position.y,
          width: 100,
          height: 48,
          rx: 10,
          ry: 10
        }
      }

      return this._boardManager.addFlexComponent({ flexComponent: button })
    }

    if (type === 'divider') {
      const divider: DividerFlexComponent = {
        id: uuid() as UUID,
        name: 'Divider',
        type: 'divider',
        properties: {
          x: position.x,
          y: position.y,
          width: 300,
          height: 4
        }
      }

      return this._boardManager.addFlexComponent({ flexComponent: divider })
    }

    if (type === 'input') {
      const input: InputFlexComponent = {
        id: uuid() as UUID,
        name: 'Input',
        type: 'input',
        properties: {
          x: position.x,
          y: position.y,
          width: 200,
          height: 48,
          rx: 10,
          ry: 10
        }
      }

      return this._boardManager.addFlexComponent({ flexComponent: input })
    }

    if (type === 'mobileScreen') {
      const mobileScreen: MobileScreenFlexComponent = {
        id: uuid() as UUID,
        name: 'Mobile Screen',
        type: 'mobileScreen',
        properties: {
          x: position.x,
          y: position.y,
          width: 375,
          height: 812
        }
      }

      return this._boardManager.addFlexComponent({ flexComponent: mobileScreen })
    }

    if (type === 'select') {
      const select: SelectFlexComponent = {
        id: uuid() as UUID,
        name: 'Select',
        type: 'select',
        properties: {
          x: position.x,
          y: position.y,
          width: 200,
          height: 48,
          rx: 10,
          ry: 10
        }
      }

      return this._boardManager.addFlexComponent({ flexComponent: select })
    }

    if (type === 'text') {
      const text: TextFlexComponent = {
        id: uuid() as UUID,
        name: 'Text',
        type: 'text',
        properties: {
          x: position.x,
          y: position.y,
          width: 200,
          height: 24,
          text: 'Text',
          fontSize: 16
        }
      }

      return this._boardManager.addFlexComponent({ flexComponent: text })
    }

    const rectangle: RectangleFlexComponent = {
      id: uuid() as UUID,
      name: 'Rectangle',
      type: 'rectangle',
      properties: {
        x: position.x,
        y: position.y,
        width: 150,
        height: 100,
        rx: 10,
        ry: 10
      }
    }

    this._boardManager.addFlexComponent({ flexComponent: rectangle })
  }

  onChangeBoardScale (params: OnChangeBoardScaleParams) {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const newTranslateX = (this._boardState.translate.x - centerX) * (params.scale / this._boardState.scale) + centerX
    const newTranslateY = (this._boardState.translate.y - centerY) * (params.scale / this._boardState.scale) + centerY

    this._boardManager.onScaleChange({ scale: params.scale })
    this._boardManager.onTranslateBoard({ translateX: newTranslateX, translateY: newTranslateY })
  }

  onUpdateFlexComponent (params: OnUpdateFlexComponentParams): void {
    this._boardManager.updateFlexComponent({ updatedFlexComponent: params.flexComponent })
  }
}
