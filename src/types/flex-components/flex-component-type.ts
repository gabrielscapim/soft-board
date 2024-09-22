import { UUID } from '../common/uuid'
import { ButtonFlexComponentProperties, InputFlexComponentProperties, RectangleFlexComponentProperties } from './properties'

/** Button */
export type ButtonFlexComponent = {
  id: UUID
  name: 'Button'
  type: 'button'
  properties: ButtonFlexComponentProperties
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
  InputFlexComponent |
  RectangleFlexComponent

export type FlexComponentName = FlexComponent['name']

export type FlexComponentProperties = FlexComponent['properties']

export type FlexComponentProperty = keyof FlexComponentProperties

export type FlexComponentPropertyValue<K extends keyof FlexComponentProperties> = FlexComponentProperties[K]

export type FlexComponentType = FlexComponent['type']
