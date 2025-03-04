import {
  AddFlexComponentsParams,
  BoardManagerI,
  OnChangeBoardMovingParams,
  OnDeleteFlexComponentsParams,
  OnDraggingFlexComponentParams,
  OnGuidesChangedParams,
  OnResizingFlexComponentParams,
  OnScaleChangeParams,
  OnStartDragFlexComponentParams,
  OnTranslateBoardParams,
  UpdateFlexComponentParams
} from './board-manager-interface'
import { BoardState } from '../board-state'
import { Dimensions, Offset } from '../../types'
import { UUID } from '../../types/common/uuid'

const DISTANCE_TO_BREAK_SNAP = 20

/**
 * Class responsible for changing the attributes of the BoardState class.
 */
export class BoardManager implements BoardManagerI {
  private _boardState: BoardState
  private _initialFlexComponentProperties: Map<UUID, Dimensions & Offset> | null

  constructor (boardState: BoardState) {
    this._boardState = boardState
    this._initialFlexComponentProperties = null
  }

  addFlexComponents (params: AddFlexComponentsParams) {
    const { flexComponents } = params

    const prevFlexComponents = this._boardState.flexComponents
    const newFlexComponents = [...prevFlexComponents, ...flexComponents]

    this._boardState.setFlexComponents(newFlexComponents)
    this._boardState.setSelectedFlexComponents(flexComponents.map(flexComponent => flexComponent.id))
  }

  onChangeBoardMoving (params: OnChangeBoardMovingParams) {
    this._boardState.setIsBoardMoving(params.isBoardMoving)
  }

  onClickOutsideOfFlexComponent () {
    this._boardState.setSelectedFlexComponents(null)
  }

  onDeleteFlexComponents (params: OnDeleteFlexComponentsParams) {
    const newFlexComponents = this._boardState.flexComponents
      .filter(flexComponent => !params.flexComponents.includes(flexComponent.id))

    this._boardState.setFlexComponents(newFlexComponents)
    this._boardState.setSelectedFlexComponents(null)
  }

  onDeselectFlexComponents () {
    this._boardState.setSelectedFlexComponents(null)
  }

  onDraggingFlexComponent (params: OnDraggingFlexComponentParams) {
    const { properties, snap } = params

    const selected = this._boardState.selectedFlexComponents

    if (!selected || selected.length === 0 || !this._initialFlexComponentProperties) {
      return
    }

    if (!this._boardState.isDragging) {
      this._boardState.setIsDragging(true)
    }

    let groupInitialX = Infinity
    let groupInitialY = Infinity

    // Get the initial position of the group
    for (const id of selected) {
      const initProps = this._initialFlexComponentProperties.get(id)

      if (initProps && initProps.x < groupInitialX) {
        groupInitialX = initProps.x
      }

      if (initProps && initProps.y < groupInitialY) {
        groupInitialY = initProps.y
      }
    }

    // Calculate the new position of the group
    const groupNewX = groupInitialX + properties.roundedDeltaX
    const groupNewY = groupInitialY + properties.roundedDeltaY

    let useSnapX = false
    let useSnapY = false

    // Check if the group is close to a snap point
    if (snap?.x && Math.abs(groupNewX - snap.x) < DISTANCE_TO_BREAK_SNAP) {
      useSnapX = true
    }

    if (snap?.y && Math.abs(groupNewY - snap.y) < DISTANCE_TO_BREAK_SNAP) {
      useSnapY = true
    }

    // Calculate the delta of the group
    const groupDeltaX = useSnapX && snap?.x ? (snap.x - groupInitialX) : properties.roundedDeltaX
    const groupDeltaY = useSnapY && snap?.y ? (snap.y - groupInitialY) : properties.roundedDeltaY

    const newFlexComponents = this._boardState.flexComponents.map(flexComponent => {
      if (!selected.includes(flexComponent.id)) {
        return flexComponent
      }

      const initialProps = this._initialFlexComponentProperties?.get(flexComponent.id)

      if (!initialProps) {
        return flexComponent
      }

      const newX = initialProps.x + groupDeltaX
      const newY = initialProps.y + groupDeltaY

      return {
        ...flexComponent,
        properties: {
          ...flexComponent.properties,
          x: newX,
          y: newY
        }
      }
    })

    this._boardState.setFlexComponents(newFlexComponents)
  }

  onEndDragFlexComponent () {
    this._boardState.setIsDragging(false)
    this._initialFlexComponentProperties = null
  }

  onGuidesChanged (params: OnGuidesChangedParams) {
    this._boardState.setGuides(params.guides)
  }

  onResizingFlexComponent (params: OnResizingFlexComponentParams) {
    const { dimension, position } = params

    const selected = this._boardState.selectedFlexComponents

    if (!selected || selected.length === 0 || !this._initialFlexComponentProperties) {
      return
    }

    const newFlexComponents = this._boardState.flexComponents.map(flexComponent => {
      if (selected.includes(flexComponent.id)) {
        const initialProps = this._initialFlexComponentProperties?.get(flexComponent.id)

        if (!initialProps) {
          return flexComponent
        }

        const newWidth = Math.max(10, initialProps.width + dimension.roundedDeltaX)
        const newHeight = Math.max(10, initialProps.height + dimension.roundedDeltaY)
        const newX = newWidth > 10 ? initialProps.x + position.roundedDeltaX : flexComponent.properties.x
        const newY = newHeight > 10 ? initialProps.y + position.roundedDeltaY : flexComponent.properties.y

        return {
          ...flexComponent,
          properties: {
            ...flexComponent.properties,
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight
          }
        }
      }

      return flexComponent
    })

    this._boardState.setFlexComponents(newFlexComponents)
    this._boardState.setSelectedFlexComponents(selected)
  }

  onScaleChange (params: OnScaleChangeParams) {
    this._boardState.setScale(params.scale)
  }

  onStartDragFlexComponent (params: OnStartDragFlexComponentParams) {
    const currentSelection = this._boardState.selectedFlexComponents ?? []
    let newSelection: UUID[] = []

    if (params.clickedInsideGroup && params.id) {
      newSelection = currentSelection
    }

    if (params.clickedInsideGroup && !params.id) {
      newSelection = currentSelection
    }

    if (params.clickedInsideGroup && params.id && params.event.shiftKey) {
      newSelection = Array.from(new Set([...currentSelection, params.id]))
    }

    if (!params.clickedInsideGroup && params.id && !params.event.shiftKey) {
      newSelection = [params.id]
    }

    if (!params.clickedInsideGroup && params.id && params.event.shiftKey) {
      newSelection = Array.from(new Set([...currentSelection, params.id]))
    }

    const initialProperties = new Map<UUID, Dimensions & Offset>()

    for (const selectedId of newSelection) {
      const component = this._boardState.flexComponents.find(flexComponent => flexComponent.id === selectedId)

      if (component) {
        initialProperties.set(selectedId, {
          x: component.properties.x,
          y: component.properties.y,
          width: component.properties.width,
          height: component.properties.height
        })
      }
    }

    this._initialFlexComponentProperties = initialProperties
    this._boardState.setSelectedFlexComponents(newSelection)
  }

  onStartResizeFlexComponent () {
    const selected = this._boardState.selectedFlexComponents

    if (!selected || selected.length === 0) {
      return
    }

    const initialProperties = new Map<UUID, Dimensions & Offset>()

    for (const id of selected) {
      const selectedFlexComponent = this._boardState.flexComponents.find(flexComponent => flexComponent.id === id)

      if (selectedFlexComponent) {
        initialProperties.set(id, {
          width: selectedFlexComponent.properties.width,
          height: selectedFlexComponent.properties.height,
          x: selectedFlexComponent.properties.x,
          y: selectedFlexComponent.properties.y
        })
      }
    }

    this._initialFlexComponentProperties = initialProperties
  }

  onTranslateBoard (params: OnTranslateBoardParams): void {
    this._boardState.setTranslate({ x: params.translateX, y: params.translateY })
  }

  updateFlexComponent (params: UpdateFlexComponentParams) {
    const { updatedFlexComponent } = params

    const newFlexComponents = this._boardState.flexComponents.map(flexComponent => {
      if (flexComponent.id === updatedFlexComponent.id) {
        return updatedFlexComponent
      }

      return flexComponent
    })

    this._boardState.setFlexComponents(newFlexComponents)
  }
}
