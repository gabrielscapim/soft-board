import { FlexComponent } from '../../../types'

export type AddFlexComponentsParams = {
  flexComponents: FlexComponent[]
}

export type DeleteFlexComponentsParams = {
  flexComponents: string[]
}

export type UpdateFlexComponentsParams = {
  updatedFlexComponents: FlexComponent[]
}

export interface BoardManagerI {
  addFlexComponents (params: AddFlexComponentsParams): void
  deleteFlexComponents (params: DeleteFlexComponentsParams): void
  updateFlexComponents (params: UpdateFlexComponentsParams): void
}
