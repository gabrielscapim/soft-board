import { UUID } from '../common/uuid'
import { RectangleFlexComponentProperties } from './properties'

/** Rectangle */
export type RectangleFlexComponent = {
  id: UUID
  name: 'Rectangle'
  type: 'rectangle'
  properties: RectangleFlexComponentProperties
}

export type FlexComponent = RectangleFlexComponent

export type FlexComponentName = FlexComponent['name']

export type FlexComponentProperties = FlexComponent['properties']

export type FlexComponentProperty = keyof FlexComponentProperties

export type FlexComponentPropertyValue<K extends keyof FlexComponentProperties> = FlexComponentProperties[K]

export type FlexComponentType = FlexComponent['type']
