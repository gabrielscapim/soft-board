import {
  AddFlexComponentParams,
  BoardManagerI,
  OnDraggingFlexComponentParams,
  OnStartDragFlexComponentParams
} from './board-manager-interface'
import { BoardState } from '../board-state'
import { Offset } from '../../types'

/**
 * Class responsible for changing the attributes of the BoardState class.
 */
export class BoardManager implements BoardManagerI {
  private _boardState: BoardState
  private _initalFlexComponentPosition: Offset

  constructor (boardState: BoardState) {
    this._boardState = boardState
    this._initalFlexComponentPosition = { x: 0, y: 0 }
  }

  addFlexComponent (params: AddFlexComponentParams) {
    const { flexComponent } = params

    const prevFlexComponents = this._boardState.flexComponents
    const newFlexComponents = [...prevFlexComponents, flexComponent]

    this._boardState.setFlexComponents(newFlexComponents)
    this._boardState.setSelectedFlexComponent(null)
  }

  onDraggingFlexComponent (params: OnDraggingFlexComponentParams) {
    const { id, properties } = params

    const currentFlexComponents = this._boardState.flexComponents
    const newFlexComponents = currentFlexComponents.map(flexComponent => {
      if (flexComponent.id === id) {
        flexComponent.properties = {
          ...flexComponent.properties,
          x: this._initalFlexComponentPosition.x + properties.roundedDeltaX,
          y: this._initalFlexComponentPosition.y + properties.roundedDeltaY
        }
      }

      return flexComponent
    })

    this._boardState.setFlexComponents(newFlexComponents)
  }

  onStartDragFlexComponent (params: OnStartDragFlexComponentParams) {
    const { id } = params

    const draggedFlexComponent = this._boardState.flexComponents.find(flexComponent => flexComponent.id === id)
    this._initalFlexComponentPosition = {
      x: draggedFlexComponent?.properties.x ?? 0,
      y: draggedFlexComponent?.properties.y ?? 0
    }

    if (draggedFlexComponent) {
      this._boardState.setSelectedFlexComponent(draggedFlexComponent)

      return
    }

    this._boardState.setSelectedFlexComponent(null)
  }
}
