import { FlexComponentSchema } from '../../types'

export const buttonFlexComponentSchema = {
  variations: [
    {
      name: 'Primary button',
      properties: {
        color: 'primary',
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
      name: 'Secondary button',
      properties: {
        color: 'secondary',
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
      name: 'Extra small button',
      properties: {
        color: 'secondary',
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
      name: 'Small button',
      properties: {
        color: 'primary',
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
      name: 'Medium button',
      properties: {
        color: 'primary',
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
      name: 'Large button',
      properties: {
        color: 'primary',
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
} satisfies FlexComponentSchema
