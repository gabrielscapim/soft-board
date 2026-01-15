import { SoftComponentSchema } from '../../types'

export const iconSoftComponentSchema = {
  variations: [
    {
      name: 'Primary Icon',
      properties: {
        color: 'primary',
        width: 24,
        height: 24,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Secondary Icon',
      properties: {
        color: 'secondary',
        width: 24,
        height: 24,
        x: 0,
        y: 0
      }
    }
  ]
} satisfies SoftComponentSchema
