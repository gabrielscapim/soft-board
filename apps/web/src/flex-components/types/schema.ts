import { FlexComponentProperties } from '../../types'

export type FlexComponentSchema = {
  variations: {
    name: string
    properties: FlexComponentProperties
  }[]
  resizable?: {
    horizontal?: boolean
    vertical?: boolean
  }
  minDimensions?: {
    width?: number
    height?: number
  }
}
