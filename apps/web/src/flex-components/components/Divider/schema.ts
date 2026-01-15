import { SoftComponentSchema } from '../../types'

export const dividerSoftComponentSchema = {
  variations: [
    {
      name: 'Primary Divider',
      properties: {
        color: 'primary',
        height: 4,
        width: 200,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Secondary Divider',
      properties: {
        color: 'secondary',
        height: 4,
        width: 200,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Tertiary Divider',
      properties: {
        color: 'tertiary',
        height: 4,
        width: 200,
        x: 0,
        y: 0
      }
    }
  ],
  resizable: {
    vertical: false
  }
} satisfies SoftComponentSchema
