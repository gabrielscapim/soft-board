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

export type OnUpdateFlexComponentPropertiesParams = {
  flexComponent: FlexComponent
  properties: FlexComponentProperties
}

export interface BoardControllerInterface {
  onAddFlexComponent(params: OnAddFlexComponentParams): void
  onUpdateFlexComponentProperties(params: OnUpdateFlexComponentPropertiesParams): void
}
