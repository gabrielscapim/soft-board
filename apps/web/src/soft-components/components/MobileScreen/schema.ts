import { SoftComponentSchema } from '../../types'

export const mobileScreenSoftComponentSchema = {
  variations: [
    {
      name: 'Mobile Screen',
      properties: {
        x: 0,
        y: 0,
        width: 375,
        height: 812
      }
    }
  ],
  resizable: {
    horizontal: false,
    vertical: true
  },
  minDimensions: {
    width: 375,
    height: 812
  }
} satisfies SoftComponentSchema
