import {
  FlexComponent,
  FlexComponentProperties,
  FlexComponentType,
  Offset
} from '../../types'

export type OnAddFlexComponentParams = {
  type: FlexComponentType
  name: string
  properties: FlexComponentProperties
  position: Offset
}

export type OnChangeBoardScaleParams = {
  scale: number
}

export type OnUpdateFlexComponentParams = {
  flexComponent: FlexComponent
}

export interface BoardControllerInterface {
  onAddFlexComponent(params: OnAddFlexComponentParams): void
  onChangeBoardScale(params: OnChangeBoardScaleParams): void
  onUpdateFlexComponent(params: OnUpdateFlexComponentParams): void
}
