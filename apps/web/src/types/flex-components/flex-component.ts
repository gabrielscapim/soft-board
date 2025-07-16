import { FlexComponentType } from './type'
import {
  ButtonFlexComponentProperties,
  DividerFlexComponentProperties,
  FlexComponentProperties,
  IconFlexComponentProperties,
  InputFlexComponentProperties,
  MobileScreenFlexComponentProperties,
  RadioButtonFlexComponentProperties,
  ShapeFlexComponentProperties,
  TextFlexComponentProperties,
  ToggleFlexComponentProperties
} from './properties'

export type BaseFlexComponent<T extends FlexComponentType, P extends FlexComponentProperties> = {
  id: string
  name: string
  type: T
  properties: P
  connectionId?: string | null
}

export type ButtonFlexComponent = BaseFlexComponent<'button', ButtonFlexComponentProperties>
export type DividerFlexComponent = BaseFlexComponent<'divider', DividerFlexComponentProperties>
export type IconFlexComponent = BaseFlexComponent<'icon', IconFlexComponentProperties>
export type InputFlexComponent = BaseFlexComponent<'input', InputFlexComponentProperties>
export type MobileScreenFlexComponent = BaseFlexComponent<'mobileScreen', MobileScreenFlexComponentProperties>
export type RadioButtonFlexComponent = BaseFlexComponent<'radioButton', RadioButtonFlexComponentProperties>
export type ShapeFlexComponent = BaseFlexComponent<'shape', ShapeFlexComponentProperties>
export type TextFlexComponent = BaseFlexComponent<'text', TextFlexComponentProperties>
export type ToggleFlexComponent = BaseFlexComponent<'toggle', ToggleFlexComponentProperties>

export type FlexComponent =
  ButtonFlexComponent |
  DividerFlexComponent |
  IconFlexComponent |
  InputFlexComponent |
  MobileScreenFlexComponent |
  RadioButtonFlexComponent |
  ShapeFlexComponent |
  TextFlexComponent |
  ToggleFlexComponent
