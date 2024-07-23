import {
  AddFlexComponentParams,
  BoardManagerI,
  OnDraggingFlexComponentParams,
  OnResizingFlexComponentParams,
  OnStartDragFlexComponentParams
} from './board-manager-interface'
import { BoardState } from '../board-state'
import { Dimensions, Offset } from '../../types'

/**
 * Class responsible for changing the attributes of the BoardState class.
 */
export class BoardManager implements BoardManagerI {
  private _boardState: BoardState
  private _initialFlexComponentPosition: Offset | null
  private _initialFlexComponentDimensions: Dimensions | null

  constructor (boardState: BoardState) {
    this._boardState = boardState
    this._initialFlexComponentPosition = null
    this._initialFlexComponentDimensions = null
  }

  /**
   * Add a new flex component.
   * @param params The AddFlexComponentParams.
   */
  addFlexComponent (params: AddFlexComponentParams) {
    const { flexComponent } = params

    const prevFlexComponents = this._boardState.flexComponents
    const newFlexComponents = [...prevFlexComponents, flexComponent]

    this._boardState.setFlexComponents(newFlexComponents)
    this._boardState.setSelectedFlexComponent(null)
  }

  /**
   * Change flex component position when it's dragging.
   * @param params The OnDraggingFlexComponentParams.
   */
  onDraggingFlexComponent (params: OnDraggingFlexComponentParams) {
    const { id, properties } = params

    const currentFlexComponents = this._boardState.flexComponents
    const newFlexComponents = currentFlexComponents.map(flexComponent => {
      if (flexComponent.id === id && this._initialFlexComponentPosition) {
        flexComponent.properties = {
          ...flexComponent.properties,
          x: this._initialFlexComponentPosition.x + properties.roundedDeltaX,
          y: this._initialFlexComponentPosition.y + properties.roundedDeltaY
        }
      }

      return flexComponent
    })

    this._boardState.setFlexComponents(newFlexComponents)
  }

  /**
   * Change flex component dimensions when it's resizing.
   * @param params The OnResizingFlexComponentParams.
   */
  onResizingFlexComponent (params: OnResizingFlexComponentParams) {
    const { roundedDeltaX, roundedDeltaY } = params

    const currentFlexComponents = this._boardState.flexComponents
    const selectedFlexComponent = this._boardState.selectedFlexComponent
    const newFlexComponents = currentFlexComponents.map(flexComponent => {
      if (flexComponent.id === selectedFlexComponent?.id && this._initialFlexComponentDimensions) {
        flexComponent.properties = {
          ...flexComponent.properties,
          x: this._initialFlexComponentDimensions.width + roundedDeltaX,
          y: this._initialFlexComponentDimensions.height + roundedDeltaY
        }
      }

      return flexComponent
    })

    this._boardState.setFlexComponents(newFlexComponents)
  }

  /**
   * Get flex component position and change selected flex component state.
   * @param params The OnStartDragFlexComponentParams.
   */
  onStartDragFlexComponent (params: OnStartDragFlexComponentParams) {
    const { id } = params

    const draggedFlexComponent = this._boardState.flexComponents.find(flexComponent => flexComponent.id === id)

    if (!draggedFlexComponent) {
      this._boardState.setSelectedFlexComponent(null)
      return
    }

    this._initialFlexComponentPosition = {
      x: draggedFlexComponent?.properties.x,
      y: draggedFlexComponent?.properties.y
    }
    this._boardState.setSelectedFlexComponent(draggedFlexComponent)
  }

  /**
   * Get flex component dimensions.
   */
  onStartResizeFlexComponent () {
    const selectedFlexComponent = this._boardState.selectedFlexComponent

    if (!selectedFlexComponent) {
      return
    }

    this._initialFlexComponentPosition = {
      x: selectedFlexComponent?.properties.width,
      y: selectedFlexComponent?.properties.height
    }
  }
}
