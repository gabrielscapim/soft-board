import { FlexComponent } from '../../types'
import { UUID } from '../../types/common/uuid'

export type AddFlexComponentParams = {
  flexComponent: FlexComponent
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

export type OnStartDragFlexComponentParams = {
  id: UUID | null
}

export type UpdateFlexComponentPropertiesParams = {
  updatedFlexComponent: FlexComponent
}

export interface BoardManagerI {
  addFlexComponent(params: AddFlexComponentParams): void
  onDraggingFlexComponent(params: OnDraggingFlexComponentParams): void
  onResizingFlexComponent(params: OnResizingFlexComponentParams): void
  onStartDragFlexComponent(params: OnStartDragFlexComponentParams): void
  onStartResizeFlexComponent(): void
  updateFlexComponentProperties(params: UpdateFlexComponentPropertiesParams): void
}
