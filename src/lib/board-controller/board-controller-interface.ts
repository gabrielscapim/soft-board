import {
  FlexComponent,
  FlexComponentProperties,
  FlexComponentType,
  Offset
} from '../../types'

export type OnAddFlexComponentParams = {
  type: FlexComponentType
  position: Offset
}

export type OnChangeBoardScaleParams = {
  scale: number
}

export type OnUpdateFlexComponentPropertiesParams = {
  flexComponent: FlexComponent
  properties: FlexComponentProperties
}

export interface BoardControllerInterface {
  onAddFlexComponent(params: OnAddFlexComponentParams): void
  onChangeBoardScale(params: OnChangeBoardScaleParams): void
  onUpdateFlexComponentProperties(params: OnUpdateFlexComponentPropertiesParams): void
}
