import { FlexComponentSchema } from '../../types'

export const inputFlexComponentSchema = {
  variations: [
    {
      name: 'Primary input',
      properties: {
        absolute: false,
        variant: 'primary',
        width: 320,
        height: 44,
        borderRadius: 12,
        fontSize: 16,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Secondary input',
      properties: {
        absolute: false,
        variant: 'secondary',
        width: 320,
        height: 44,
        borderRadius: 12,
        fontSize: 16,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Tertiary input',
      properties: {
        absolute: false,
        variant: 'tertiary',
        width: 320,
        height: 44,
        borderRadius: 0,
        fontSize: 16,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Extra small input',
      properties: {
        absolute: false,
        variant: 'secondary',
        width: 320,
        height: 36,
        borderRadius: 12,
        fontSize: 12,
        paddingBottom: 6,
        paddingTop: 6,
        paddingLeft: 8,
        paddingRight: 8,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Small input',
      properties: {
        absolute: false,
        variant: 'secondary',
        width: 320,
        height: 40,
        borderRadius: 12,
        fontSize: 14,
        paddingBottom: 9,
        paddingTop: 9,
        paddingLeft: 12,
        paddingRight: 12,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Medium input',
      properties: {
        absolute: false,
        variant: 'secondary',
        width: 320,
        height: 44,
        borderRadius: 12,
        fontSize: 16,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Large input',
      properties: {
        absolute: false,
        variant: 'secondary',
        width: 320,
        height: 48,
        borderRadius: 12,
        fontSize: 18,
        paddingBottom: 16,
        paddingTop: 16,
        paddingLeft: 20,
        paddingRight: 20,
        x: 0,
        y: 0
      }
    },
    {
      name: 'Password input',
      properties: {
        absolute: false,
        variant: 'secondary',
        width: 320,
        height: 44,
        borderRadius: 12,
        fontSize: 16,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        placeholder: '•••••••••',
        rightIcon: 'eye',
        textAlign: 'left',
        x: 0,
        y: 0
      }
    },
    {
      name: 'Dropdown',
      properties: {
        absolute: false,
        variant: 'secondary',
        width: 320,
        height: 44,
        borderRadius: 12,
        fontSize: 16,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        placeholder: 'Select',
        rightIcon: 'chevron-down',
        textAlign: 'left',
        x: 0,
        y: 0
      }
    }
  ]
} satisfies FlexComponentSchema
