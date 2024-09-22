import { UUID } from '../common/uuid'
import { ButtonFlexComponentProperties, DividerFlexComponentProperties, InputFlexComponentProperties, RectangleFlexComponentProperties } from './properties'

/** Button */
export type ButtonFlexComponent = {
  id: UUID
  name: 'Button'
  type: 'button'
  properties: ButtonFlexComponentProperties
}

/** Divider */
export type DividerFlexComponent = {
  id: UUID
  name: 'Divider'
  type: 'divider'
  properties: DividerFlexComponentProperties
}

/** Input */
export type InputFlexComponent = {
  id: UUID
  name: 'Input'
  type: 'input'
  properties: InputFlexComponentProperties
}

/** Rectangle */
export type RectangleFlexComponent = {
  id: UUID
  name: 'Rectangle'
  type: 'rectangle'
  properties: RectangleFlexComponentProperties
}

export type FlexComponent =
  ButtonFlexComponent |
  DividerFlexComponent |
  InputFlexComponent |
  RectangleFlexComponent

export type FlexComponentName = FlexComponent['name']

export type FlexComponentProperties = FlexComponent['properties']

export type FlexComponentProperty = keyof FlexComponentProperties

export type FlexComponentPropertyValue<K extends keyof FlexComponentProperties> = FlexComponentProperties[K]

export type FlexComponentType = FlexComponent['type']
