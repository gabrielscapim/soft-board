import {
  AddFlexComponentParams,
  BoardManagerI,
  OnChangeBoardMovingParams,
  OnDraggingFlexComponentParams,
  OnResizingFlexComponentParams,
  OnScaleChangeParams,
  OnStartDragFlexComponentParams,
  OnTranslateBoardParams,
  UpdateFlexComponentPropertiesParams
} from './board-manager-interface'
import { BoardState } from '../board-state'
import { Dimensions, Offset } from '../../types'

/**
 * Class responsible for changing the attributes of the BoardState class.
 */
export class BoardManager implements BoardManagerI {
  private _boardState: BoardState
  private _initialFlexComponentProperties: (Dimensions & Offset) | null

  constructor (boardState: BoardState) {
    this._boardState = boardState
    this._initialFlexComponentProperties = null
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

  onChangeBoardMoving (params: OnChangeBoardMovingParams) {
    this._boardState.setIsBoardMoving(params.isBoardMoving)
  }

  /**
   * Change flex component position when it's dragging.
   * @param params The OnDraggingFlexComponentParams.
   */
  onDraggingFlexComponent (params: OnDraggingFlexComponentParams) {
    const { id, properties } = params

    const currentFlexComponents = this._boardState.flexComponents
    const newFlexComponents = currentFlexComponents.map(flexComponent => {
      if (flexComponent.id === id && this._initialFlexComponentProperties) {
        const newSelectedFlexComponent = {
          ...flexComponent,
          properties: {
            ...flexComponent.properties,
            x: this._initialFlexComponentProperties.x + properties.roundedDeltaX,
            y: this._initialFlexComponentProperties.y + properties.roundedDeltaY
          }
        }

        this._boardState.setSelectedFlexComponent(newSelectedFlexComponent)
        return newSelectedFlexComponent
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
    const { dimension, position } = params

    const currentFlexComponents = this._boardState.flexComponents
    const selectedFlexComponent = this._boardState.selectedFlexComponent

    const newFlexComponents = currentFlexComponents.map(flexComponent => {
      if (flexComponent.id === selectedFlexComponent?.id && this._initialFlexComponentProperties) {
        const width = Math.max(10, this._initialFlexComponentProperties.width + dimension.roundedDeltaX)
        const height = Math.max(10, this._initialFlexComponentProperties.height + dimension.roundedDeltaY)
        const x = width > 10 ? this._initialFlexComponentProperties.x + position.roundedDeltaX : selectedFlexComponent.properties.x
        const y = height > 10 ? this._initialFlexComponentProperties.y + position.roundedDeltaY : selectedFlexComponent.properties.y

        const newSelectedFlexComponent = {
          ...flexComponent,
          properties: {
            ...flexComponent.properties,
            x,
            y,
            width,
            height
          }
        }

        this._boardState.setSelectedFlexComponent(newSelectedFlexComponent)
        return newSelectedFlexComponent
      }

      return flexComponent
    })

    this._boardState.setFlexComponents(newFlexComponents)
  }

  onScaleChange (params: OnScaleChangeParams) {
    this._boardState.setScale(params.scale)
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

    this._initialFlexComponentProperties = {
      width: draggedFlexComponent.properties.width,
      height: draggedFlexComponent.properties.height,
      x: draggedFlexComponent.properties.x,
      y: draggedFlexComponent.properties.y
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

    this._initialFlexComponentProperties = {
      width: selectedFlexComponent.properties.width,
      height: selectedFlexComponent.properties.height,
      x: selectedFlexComponent.properties.x,
      y: selectedFlexComponent.properties.y
    }
  }

  onTranslateBoard (params: OnTranslateBoardParams): void {
    this._boardState.setTranslate({ x: params.translateX, y: params.translateY })
  }

  updateFlexComponentProperties (params: UpdateFlexComponentPropertiesParams) {
    const { updatedFlexComponent } = params

    const selectedFlexComponent = this._boardState.selectedFlexComponent
    const newFlexComponents = this._boardState.flexComponents.map(flexComponent => {
      if (selectedFlexComponent?.id === flexComponent.id) {
        this._boardState.setSelectedFlexComponent(updatedFlexComponent)
      }

      if (flexComponent.id === updatedFlexComponent.id) {
        return updatedFlexComponent
      }

      return flexComponent
    })

    this._boardState.setFlexComponents(newFlexComponents)
  }
}
