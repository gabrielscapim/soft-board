import { FlexComponentSchema } from '../../types'

export const toggleFlexComponentSchema = {
  variations: [
    {
      name: 'Activated toggle',
      properties: {
        activated: true,
        width: 44,
        height: 32,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Deactivated toggle',
      properties: {
        activated: false,
        width: 44,
        height: 32,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Extra small toggle',
      properties: {
        activated: false,
        width: 36,
        height: 24,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Small toggle',
      properties: {
        activated: false,
        width: 40,
        height: 28,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Medium toggle',
      properties: {
        activated: false,
        width: 44,
        height: 32,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Large toggle',
      properties: {
        activated: false,
        width: 48,
        height: 36,
        x: 0,
        y: 0
      }
    }
  ]
} satisfies FlexComponentSchema
