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

export type BaseSoftComponent<T extends SoftComponentType, P extends SoftComponentProperties> = {
  id: string
  name: string
  type: T
  properties: P
  connectionId?: string | null
  screenId?: string | null
}

export type ButtonSoftComponent = BaseSoftComponent<'button', ButtonSoftComponentProperties>
export type DividerSoftComponent = BaseSoftComponent<'divider', DividerSoftComponentProperties>
export type IconSoftComponent = BaseSoftComponent<'icon', IconSoftComponentProperties>
export type InputSoftComponent = BaseSoftComponent<'input', InputSoftComponentProperties>
export type MobileScreenSoftComponent = BaseSoftComponent<'mobileScreen', MobileScreenSoftComponentProperties>
export type RadioButtonSoftComponent = BaseSoftComponent<'radioButton', RadioButtonSoftComponentProperties>
export type ShapeSoftComponent = BaseSoftComponent<'shape', ShapeSoftComponentProperties>
export type TextSoftComponent = BaseSoftComponent<'text', TextSoftComponentProperties>
export type ToggleSoftComponent = BaseSoftComponent<'toggle', ToggleSoftComponentProperties>

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
