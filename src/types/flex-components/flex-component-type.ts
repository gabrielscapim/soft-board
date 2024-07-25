import { UUID } from '../common/uuid'

export type RectangleFlexComponent = {
  id: UUID
  name: 'Rectangle'
  type: 'rectangle'
  properties: {
    x: number
		y: number
		width: number
		height: number
    rx?: number
    ry?: number
  }
}

export type FlexComponent = RectangleFlexComponent

export type FlexComponentName = FlexComponent['name']

export type FlexComponentProperties = FlexComponent['properties']

export type FlexComponentProperty = keyof FlexComponentProperties

export type FlexComponentPropertyValue<K extends keyof FlexComponentProperties> = FlexComponentProperties[K]

export type FlexComponentType = FlexComponent['type']
