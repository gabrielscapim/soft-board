import { UUID } from '../common/uuid'

export type RectangleFlexComponent = {
  id: UUID
  name: 'Rectangle'
  type: 'rectangle'
  properties: {
    x?: number
		y?: number
		width?: number
		height?: number
    rx?: number
    ry?: number
  }
}

export type FlexComponent = RectangleFlexComponent

export type FlexComponentName = FlexComponent['name']

export type FlexComponentPrompertis = FlexComponent['properties']

export type FlexComponentType = FlexComponent['type']

