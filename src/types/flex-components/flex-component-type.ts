import { UUID } from '../common/uuid'
import { ButtonFlexComponentProperties, DividerFlexComponentProperties, InputFlexComponentProperties, RectangleFlexComponentProperties, SelectFlexComponentProperties } from './properties'

/** Button */
export type ButtonFlexComponent = {
  id: UUID
  name: string
  type: 'button'
  properties: ButtonFlexComponentProperties
}

/** Divider */
export type DividerFlexComponent = {
  id: UUID
  name: string
  type: 'divider'
  properties: DividerFlexComponentProperties
}

/** Input */
export type InputFlexComponent = {
  id: UUID
  name: string
  type: 'input'
  properties: InputFlexComponentProperties
}

/** Rectangle */
export type RectangleFlexComponent = {
  id: UUID
  name: string
  type: 'rectangle'
  properties: RectangleFlexComponentProperties
}

/** Select */
export type SelectFlexComponent = {
  id: UUID
  name: string
  type: 'select'
  properties: SelectFlexComponentProperties
}

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
