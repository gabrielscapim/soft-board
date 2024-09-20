import { FlexComponent } from '../../types'
import { UUID } from '../../types/common/uuid'

export type AddFlexComponentParams = {
  flexComponent: FlexComponent
}

export type OnChangeBoardMovingParams = {
  isBoardMoving: boolean
}

export type OnDraggingFlexComponentParams = {
  id: UUID
  properties: {
    roundedDeltaX: number
    roundedDeltaY: number
  }
}

export type OnResizingFlexComponentParams = {
  dimension: {
    roundedDeltaX: number
    roundedDeltaY: number
  }
  position: {
    roundedDeltaX: number
    roundedDeltaY: number
  }
}

export type OnScaleChangeParams = {
  scale: number
}

export type OnStartDragFlexComponentParams = {
  id: UUID | null
}

export type OnTranslateBoardParams = {
  translateX: number
  translateY: number
}

export type UpdateFlexComponentPropertiesParams = {
  updatedFlexComponent: FlexComponent
}

export interface BoardManagerI {
  addFlexComponent(params: AddFlexComponentParams): void
  onChangeBoardMoving(params: OnChangeBoardMovingParams): void
  onDraggingFlexComponent(params: OnDraggingFlexComponentParams): void
  onResizingFlexComponent(params: OnResizingFlexComponentParams): void
  onScaleChange(params: OnScaleChangeParams): void
  onStartDragFlexComponent(params: OnStartDragFlexComponentParams): void
  onStartResizeFlexComponent(): void
  onTranslateBoard(params: OnTranslateBoardParams): void
  updateFlexComponentProperties(params: UpdateFlexComponentPropertiesParams): void
}
