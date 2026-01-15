import { SoftComponentType } from './type'
import {
  ButtonSoftComponentProperties,
  DividerSoftComponentProperties,
  SoftComponentProperties,
  IconSoftComponentProperties,
  InputSoftComponentProperties,
  MobileScreenSoftComponentProperties,
  RadioButtonSoftComponentProperties,
  ShapeSoftComponentProperties,
  TextSoftComponentProperties,
  ToggleSoftComponentProperties
} from './properties'

export type BaseFlexComponent<T extends SoftComponentType, P extends SoftComponentProperties> = {
  id: string
  name: string
  type: T
  properties: P
  connectionId?: string | null
  screenId?: string | null
}

export type ButtonSoftComponent = BaseFlexComponent<'button', ButtonSoftComponentProperties>
export type DividerSoftComponent = BaseFlexComponent<'divider', DividerSoftComponentProperties>
export type IconSoftComponent = BaseFlexComponent<'icon', IconSoftComponentProperties>
export type InputSoftComponent = BaseFlexComponent<'input', InputSoftComponentProperties>
export type MobileScreenSoftComponent = BaseFlexComponent<'mobileScreen', MobileScreenSoftComponentProperties>
export type RadioButtonSoftComponent = BaseFlexComponent<'radioButton', RadioButtonSoftComponentProperties>
export type ShapeSoftComponent = BaseFlexComponent<'shape', ShapeSoftComponentProperties>
export type TextSoftComponent = BaseFlexComponent<'text', TextSoftComponentProperties>
export type ToggleSoftComponent = BaseFlexComponent<'toggle', ToggleSoftComponentProperties>

export type SoftComponent =
  ButtonSoftComponent |
  DividerSoftComponent |
  IconSoftComponent |
  InputSoftComponent |
  MobileScreenSoftComponent |
  RadioButtonSoftComponent |
  ShapeSoftComponent |
  TextSoftComponent |
  ToggleSoftComponent
