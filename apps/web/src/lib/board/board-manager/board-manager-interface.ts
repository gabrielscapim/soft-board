import { Dimensions, FlexComponent, Offset } from '../../../types'

export type AddFlexComponentsParams = {
  flexComponents: FlexComponent[]
}

export type DeleteFlexComponentsParams = {
  flexComponents: string[]
}

export type UpdateFlexComponentsParams = {
  updatedFlexComponents: FlexComponent[]
  initialProperties?: Map<string, Dimensions & Offset & { screenId?: string | null }> | null
}

export interface BoardManagerI {
  addFlexComponents (params: AddFlexComponentsParams): void
  deleteFlexComponents (params: DeleteFlexComponentsParams): void
  updateFlexComponents (params: UpdateFlexComponentsParams): void
}
