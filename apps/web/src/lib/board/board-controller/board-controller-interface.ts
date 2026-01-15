import {
  SoftComponent,
  SoftComponentProperties,
  SoftComponentType,
  Offset
} from '../../../types'

export type OnAddSoftComponentParams = {
  type: SoftComponentType
  name: string
  properties: SoftComponentProperties
  position: Offset
}

export type OnAlignSoftComponentsParams = {
  option: string
}

export type OnChangeBoardScaleParams = {
  scale: number
}

export type OnOrderSoftComponentsParams = {
  option: string
}

export type OnUpdateSoftComponentParams = {
  softComponent: SoftComponent
}

export type OnUpdateSoftComponentPropertyParams = {
  id: string
  property: keyof SoftComponentProperties
  value: any
}

export interface BoardControllerInterface {
  onAddSoftComponent(params: OnAddSoftComponentParams): void
  onAlignSoftComponents(params: OnAlignSoftComponentsParams): void
  onChangeBoardScale(params: OnChangeBoardScaleParams): void
  onOrderSoftComponents(params: OnOrderSoftComponentsParams): void
  onUpdateSoftComponent(params: OnUpdateSoftComponentParams): void
  onUpdateSoftComponentProperty(params: OnUpdateSoftComponentPropertyParams): void
}
