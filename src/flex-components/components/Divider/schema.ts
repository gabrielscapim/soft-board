import { FlexComponentSchema } from '../../types'

export const dividerFlexComponentSchema = {
  variations: [
    {
      name: 'Primary Divider',
      properties: {
        color: 'primary',
        height: 2,
        width: 200,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Secondary Divider',
      properties: {
        color: 'secondary',
        height: 2,
        width: 200,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Tertiary Divider',
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
