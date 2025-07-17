import { FlexComponent } from '../../../types'

export type AddFlexComponentsParams = {
  flexComponents: FlexComponent[]
}

export type DeleteFlexComponentsParams = {
  flexComponents: string[]
}

export type OnDraggingFlexComponentParams = {
  id: string
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
  screenId?: string
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

export type OnStartDragFlexComponentParams = {
  event: MouseEvent
  id?: string | null
  clickedInsideGroup?: boolean
}

export type UpdateFlexComponentParams = {
  updatedFlexComponent: FlexComponent
}

export interface BoardManagerI {
  addFlexComponents (params: AddFlexComponentsParams): void
  deleteFlexComponents (params: DeleteFlexComponentsParams): void
  onDraggingFlexComponent (params: OnDraggingFlexComponentParams): void
  onEndDragFlexComponent (): void
  onEndResizeFlexComponent (): void
  onResizingFlexComponent (params: OnResizingFlexComponentParams): void
  onStartDragFlexComponent (params: OnStartDragFlexComponentParams): void
  onStartResizeFlexComponent (): void
  updateFlexComponent (params: UpdateFlexComponentParams): void
}
