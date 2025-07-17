import { FlexComponent } from '../../../types'

export type AddFlexComponentsParams = {
  flexComponents: FlexComponent[]
}

export type DeleteFlexComponentsParams = {
  flexComponents: string[]
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

export type UpdateFlexComponentParams = {
  updatedFlexComponent: FlexComponent
}

export interface BoardManagerI {
  addFlexComponents (params: AddFlexComponentsParams): void
  deleteFlexComponents (params: DeleteFlexComponentsParams): void
  onEndResizeFlexComponent (): void
  onResizingFlexComponent (params: OnResizingFlexComponentParams): void
  onStartResizeFlexComponent (): void
  updateFlexComponent (params: UpdateFlexComponentParams): void
}
