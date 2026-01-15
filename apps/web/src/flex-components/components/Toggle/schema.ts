import { SoftComponentSchema } from '../../types'

export const toggleSoftComponentSchema = {
  variations: [
    {
      name: 'Activated Toggle',
      properties: {
        activated: true,
        width: 44,
        height: 32,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Deactivated Toggle',
      properties: {
        activated: false,
        width: 44,
        height: 32,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Extra small Toggle',
      properties: {
        activated: false,
        width: 36,
        height: 24,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Small Toggle',
      properties: {
        activated: false,
        width: 40,
        height: 28,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Medium Toggle',
      properties: {
        activated: false,
        width: 44,
        height: 32,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Large Toggle',
      properties: {
        activated: false,
        width: 48,
        height: 36,
        x: 0,
        y: 0
      }
    }
  ]
} satisfies SoftComponentSchema
