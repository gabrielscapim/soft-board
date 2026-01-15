import { SoftComponentProperties } from '../../types'

export type SoftComponentSchema = {
  variations: {
    name: string
    properties: SoftComponentProperties
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
