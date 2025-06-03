import { FlexComponentSchema } from '../../types'

export const radioButtonFlexComponentSchema = {
  variations: [
    {
      name: 'Activated radio button',
      properties: {
        activated: true,
        width: 20,
        height: 20,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Deactivated radio button',
      properties: {
        activated: false,
        width: 20,
        height: 20,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Extra small radio button',
      properties: {
        activated: true,
        width: 12,
        height: 12,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Small radio button',
      properties: {
        activated: true,
        width: 16,
        height: 16,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Medium radio button',
      properties: {
        activated: true,
        width: 20,
        height: 20,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Large radio button',
      properties: {
        activated: true,
        width: 24,
        height: 24,
        x: 0,
        y: 0
      }
    }
  ]
} satisfies FlexComponentSchema
