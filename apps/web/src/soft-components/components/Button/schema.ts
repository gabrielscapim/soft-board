import { SoftComponentSchema } from '../../types'

export const buttonSoftComponentSchema = {
  variations: [
    {
      name: 'Primary Button',
      properties: {
        color: 'primary',
        label: 'Button',
        borderRadius: 12,
        fontSize: 16,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 24,
        paddingRight: 24,
        x: 0,
        y: 0,
        width: 100,
        height: 48
      }
    },
    {
      name: 'Secondary Button',
      properties: {
        color: 'secondary',
        label: 'Button',
        borderRadius: 12,
        fontSize: 16,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 24,
        paddingRight: 24,
        x: 0,
        y: 0,
        width: 100,
        height: 48
      }
    },
    {
      name: 'Extra small Button',
      properties: {
        color: 'secondary',
        label: 'Button',
        borderRadius: 6,
        fontSize: 12,
        paddingBottom: 6,
        paddingTop: 6,
        paddingLeft: 16,
        paddingRight: 16,
        x: 0,
        y: 0,
        width: 80,
        height: 32
      }
    },
    {
      name: 'Small Button',
      properties: {
        color: 'primary',
        label: 'Button',
        borderRadius: 12,
        fontSize: 16,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 24,
        paddingRight: 24,
        x: 0,
        y: 0,
        width: 86,
        height: 40
      }
    },
    {
      name: 'Medium Button',
      properties: {
        color: 'primary',
        label: 'Button',
        borderRadius: 12,
        fontSize: 16,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 24,
        paddingRight: 24,
        x: 0,
        y: 0,
        width: 100,
        height: 48
      }
    },
    {
      name: 'Large Button',
      properties: {
        color: 'primary',
        label: 'Button',
        borderRadius: 12,
        fontSize: 16,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 24,
        paddingRight: 24,
        x: 0,
        y: 0,
        width: 120,
        height: 48
      }
    }
  ]
} satisfies SoftComponentSchema
