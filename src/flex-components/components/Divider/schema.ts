import { FlexComponentSchema } from '../../types'

export const dividerFlexComponentSchema = {
  variations: [
    {
      name: 'Primary divider',
      properties: {
        color: 'primary',
        height: 2,
        width: 200,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Secondary divider',
      properties: {
        color: 'secondary',
        height: 2,
        width: 200,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Tertiary divider',
      properties: {
        color: 'tertiary',
        height: 2,
        width: 200,
        x: 0,
        y: 0
      }
    }
  ],
  resizable: {
    vertical: false
  }
} satisfies FlexComponentSchema
