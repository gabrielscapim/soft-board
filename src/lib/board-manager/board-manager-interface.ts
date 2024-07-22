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

export type OnStartDragFlexComponentParams = {
  id?: UUID
}

export interface BoardManagerI {
  addFlexComponent(params: AddFlexComponentParams): void
  onDraggingFlexComponent(params: OnDraggingFlexComponentParams): void
  onStartDragFlexComponent(params: OnStartDragFlexComponentParams): void
}
