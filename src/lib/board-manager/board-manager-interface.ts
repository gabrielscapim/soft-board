import { FlexComponent } from '../../types'
import { Guide } from '../../types/board-positions/guide'
import { UUID } from '../../types/common/uuid'

export type AddFlexComponentsParams = {
  flexComponents: FlexComponent[]
}

export type OnDeleteFlexComponentsParams = {
  flexComponents: UUID[]
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
  snap?: {
    type?: string
    distance?: 'primary' | 'secondary'
    x?: number
    y?: number
  }
}

export type OnGuidesChangedParams = {
  guides: {
    horizontal: Guide[]
    vertical: Guide[]
  }
}

export type OnResizingFlexComponentParams = {
  resizeDirection: string
  dimension: {
    roundedDeltaX: number
    roundedDeltaY: number
  }
  position: {
    roundedDeltaX: number
    roundedDeltaY: number
  }
  snap?: {
    type?: string
    distance?: 'primary' | 'secondary'
    position?: {
      x?: number
      y?: number
    }
    dimension?: {
      x?: number
      y?: number
    }
  }
}

export type OnScaleChangeParams = {
  scale: number
}

export type OnStartDragFlexComponentParams = {
  event: MouseEvent
  id?: UUID | null
  clickedInsideGroup?: boolean
}

export type OnTranslateBoardParams = {
  translateX: number
  translateY: number
}

export type UpdateFlexComponentParams = {
  updatedFlexComponent: FlexComponent
}

export interface BoardManagerI {
  addFlexComponents (params: AddFlexComponentsParams): void
  onClickOutsideOfFlexComponent (): void
  onDeleteFlexComponents (params: OnDeleteFlexComponentsParams): void
  onChangeBoardMoving (params: OnChangeBoardMovingParams): void
  onDraggingFlexComponent (params: OnDraggingFlexComponentParams): void
  onEndDragFlexComponent (): void
  onEndResizeFlexComponent (): void
  onGuidesChanged (params: OnGuidesChangedParams): void
  onResizingFlexComponent (params: OnResizingFlexComponentParams): void
  onScaleChange (params: OnScaleChangeParams): void
  onStartDragFlexComponent (params: OnStartDragFlexComponentParams): void
  onStartResizeFlexComponent (): void
  onTranslateBoard (params: OnTranslateBoardParams): void
  updateFlexComponent (params: UpdateFlexComponentParams): void
}
