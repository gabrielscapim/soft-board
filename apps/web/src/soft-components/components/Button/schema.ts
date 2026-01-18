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
        width: 96,
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
        width: 100,
        height: 48
      }
    }
  ]
} satisfies SoftComponentSchema
