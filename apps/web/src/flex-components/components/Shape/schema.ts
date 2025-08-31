import { FlexComponentSchema } from '../../types'

export const shapeFlexComponentSchema = {
  variations: [
    {
      name: 'Primary Shape',
      properties: {
        x: 0,
        y: 0,
        fill: true,
        color: 'primary',
        width: 128,
        height: 128,
        borderRadius: 12,
        borderWidth: 2
      }
    },
    {
      name: 'Secondary Shape',
      properties: {
        x: 0,
        y: 0,
        fill: true,
        color: 'secondary',
        width: 128,
        height: 128,
        borderRadius: 12,
        borderWidth: 2
      }
    },
    {
      name: 'Unfilled Shape',
      properties: {
        x: 0,
        y: 0,
        fill: false,
        color: 'primary',
        width: 128,
        height: 128,
        borderRadius: 12,
        borderWidth: 2
      }
    },
    {
      name: 'Circle',
      properties: {
        x: 0,
        y: 0,
        fill: true,
        color: 'secondary',
        width: 128,
        height: 128,
        borderRadius: 64,
        borderWidth: 2
      }
    },
    {
      name: 'Rectangle',
      properties: {
        x: 0,
        y: 0,
        fill: true,
        color: 'secondary',
        width: 256,
        height: 128,
        borderRadius: 12,
        borderWidth: 2
      }
    }
  ]
} satisfies FlexComponentSchema
