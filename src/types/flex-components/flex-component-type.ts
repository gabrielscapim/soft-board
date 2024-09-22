import { UUID } from '../common/uuid'
import { ButtonFlexComponentProperties, RectangleFlexComponentProperties } from './properties'

/** Button */
export type ButtonFlexComponent = {
  id: UUID
  name: 'Button'
  type: 'button'
  properties: ButtonFlexComponentProperties
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
  RectangleFlexComponent

export type FlexComponentName = FlexComponent['name']

export type FlexComponentProperties = FlexComponent['properties']

export type FlexComponentProperty = keyof FlexComponentProperties

export type FlexComponentPropertyValue<K extends keyof FlexComponentProperties> = FlexComponentProperties[K]

export type FlexComponentType = FlexComponent['type']
