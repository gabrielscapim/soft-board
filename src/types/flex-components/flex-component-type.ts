import { UUID } from '../common/uuid'
import { ButtonFlexComponentProperties, DividerFlexComponentProperties, InputFlexComponentProperties, RectangleFlexComponentProperties, SelectFlexComponentProperties } from './properties'

export type BaseFlexComponent<T extends FlexComponentType, P extends FlexComponentProperties> = {
  id: UUID
  name: string
  type: T
  properties: P
  connection?: UUID | null
}

export type ButtonFlexComponent = BaseFlexComponent<'button', ButtonFlexComponentProperties>
export type DividerFlexComponent = BaseFlexComponent<'divider', DividerFlexComponentProperties>
export type InputFlexComponent = BaseFlexComponent<'input', InputFlexComponentProperties>
export type RectangleFlexComponent = BaseFlexComponent<'rectangle', RectangleFlexComponentProperties>
export type SelectFlexComponent = BaseFlexComponent<'select', SelectFlexComponentProperties>

export type FlexComponent =
  ButtonFlexComponent |
  DividerFlexComponent |
  InputFlexComponent |
  RectangleFlexComponent |
  SelectFlexComponent

export type FlexComponentName = FlexComponent['name']

export type FlexComponentProperties = FlexComponent['properties']

export type FlexComponentProperty = keyof FlexComponentProperties

export type FlexComponentPropertyValue<K extends keyof FlexComponentProperties> = FlexComponentProperties[K]

export type FlexComponentType = FlexComponent['type']
