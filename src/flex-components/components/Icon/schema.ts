import { FlexComponentSchema } from '../../types'

export const iconFlexComponentSchema = {
  variations: [
    {
      name: 'Primary icon',
      properties: {
        color: 'primary',
        width: 24,
        height: 24,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Secondary icon',
      properties: {
        color: 'secondary',
        width: 24,
        height: 24,
        x: 0,
        y: 0
      }
    }
  ]
} satisfies FlexComponentSchema
