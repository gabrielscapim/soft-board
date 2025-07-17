import { FlexComponent } from '../../../types'

export type AddFlexComponentsParams = {
  flexComponents: FlexComponent[]
}

export type DeleteFlexComponentsParams = {
  flexComponents: string[]
}

export type UpdateFlexComponentParams = {
  updatedFlexComponent: FlexComponent
}

export interface BoardManagerI {
  addFlexComponents (params: AddFlexComponentsParams): void
  deleteFlexComponents (params: DeleteFlexComponentsParams): void
  updateFlexComponent (params: UpdateFlexComponentParams): void
}
