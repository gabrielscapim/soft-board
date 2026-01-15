import { Dimensions, SoftComponent, Offset } from '../../../types'

export type AddSoftComponentsParams = {
  softComponents: SoftComponent[]
}

export type DeleteSoftComponentsParams = {
  softComponents: string[]
}

export type UpdateSoftComponentsParams = {
  updatedSoftComponents: SoftComponent[]
  initialProperties?: Map<string, Dimensions & Offset & { screenId?: string | null }> | null
}

export interface BoardManagerI {
  addSoftComponents (params: AddSoftComponentsParams): void
  deleteSoftComponents (params: DeleteSoftComponentsParams): void
  updateSoftComponents (params: UpdateSoftComponentsParams): void
}
