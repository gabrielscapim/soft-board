import {
  FlexComponent,
  FlexComponentProperties,
  FlexComponentType,
  Offset
} from '../../../types'

export type OnAddFlexComponentParams = {
  type: FlexComponentType
  name: string
  properties: FlexComponentProperties
  position: Offset
}

export type OnAlignFlexComponentsParams = {
  option: string
}

export type OnChangeBoardScaleParams = {
  scale: number
}

export type OnOrderFlexComponentsParams = {
  option: string
}

export type OnUpdateFlexComponentParams = {
  flexComponent: FlexComponent
}

export type OnUpdateFlexComponentPropertyParams = {
  id: string
  property: keyof FlexComponentProperties
  value: any
}

export interface BoardControllerInterface {
  onAddFlexComponent(params: OnAddFlexComponentParams): void
  onAlignFlexComponents(params: OnAlignFlexComponentsParams): void
  onChangeBoardScale(params: OnChangeBoardScaleParams): void
  onOrderFlexComponents(params: OnOrderFlexComponentsParams): void
  onUpdateFlexComponent(params: OnUpdateFlexComponentParams): void
  onUpdateFlexComponentProperty(params: OnUpdateFlexComponentPropertyParams): void
}
