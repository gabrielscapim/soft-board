import { FlexComponentSchema } from '../../types'

export const shapeFlexComponentSchema = {
  variations: [
    {
      name: 'Primary shape',
      properties: {
        x: 0,
        y: 0,
        color: 'primary',
        width: 128,
        height: 128,
        borderRadius: 12
      }
    },
    {
      name: 'Secondary shape',
      properties: {
        x: 0,
        y: 0,
        color: 'secondary',
        width: 128,
        height: 128,
        borderRadius: 12
      }
    },
    {
      name: 'Tertiary shape',
      properties: {
        x: 0,
        y: 0,
        color: 'tertiary',
        width: 128,
        height: 128,
        borderRadius: 12
      }
    },
    {
      name: 'Unfilled shape',
      properties: {
        x: 0,
        y: 0,
        fill: false,
        color: 'primary',
        width: 128,
        height: 128,
        borderRadius: 12
      }
    },
    {
      name: 'Circle',
      properties: {
        x: 0,
        y: 0,
        color: 'primary',
        width: 128,
        height: 128,
        borderRadius: 64
      }
    },
    {
      name: 'Rectangle',
      properties: {
        x: 0,
        y: 0,
        color: 'primary',
        width: 256,
        height: 128,
        borderRadius: 12
      }
    }
  ]
} satisfies FlexComponentSchema
