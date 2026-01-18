import { SoftComponentSchema } from '../../types'

export const inputSoftComponentSchema = {
  variations: [
    {
      name: 'Primary Input',
      properties: {
        variant: 'primary',
        placeholder: 'Input',
        width: 250,
        height: 44,
        borderRadius: 12,
        fontSize: 16,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: 'left',
        x: 0,
        y: 0
      }
    },
    {
      name: 'Secondary Input',
      properties: {
        variant: 'secondary',
        placeholder: 'Input',
        width: 250,
        height: 44,
        borderRadius: 12,
        fontSize: 16,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: 'left',
        x: 0,
        y: 0
      }
    },
    {
      name: 'Tertiary Input',
      properties: {
        variant: 'tertiary',
        placeholder: 'Input',
        width: 250,
        height: 44,
        borderRadius: 0,
        fontSize: 16,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: 'left',
        x: 0,
        y: 0
      }
    },
    {
      name: 'Extra small Input',
      properties: {
        variant: 'secondary',
        placeholder: 'Input',
        width: 250,
        height: 36,
        borderRadius: 12,
        fontSize: 12,
        paddingBottom: 6,
        paddingTop: 6,
        paddingLeft: 8,
        paddingRight: 8,
        textAlign: 'left',
        x: 0,
        y: 0
      }
    },
    {
      name: 'Small Input',
      properties: {
        variant: 'secondary',
        placeholder: 'Input',
        width: 250,
        height: 40,
        borderRadius: 12,
        fontSize: 14,
        paddingBottom: 9,
        paddingTop: 9,
        paddingLeft: 12,
        paddingRight: 12,
        textAlign: 'left',
        x: 0,
        y: 0
      }
    },
    {
      name: 'Medium Input',
      properties: {
        variant: 'secondary',
        placeholder: 'Input',
        width: 250,
        height: 44,
        borderRadius: 12,
        fontSize: 16,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: 'left',
        x: 0,
        y: 0
      }
    },
    {
      name: 'Large Input',
      properties: {
        variant: 'secondary',
        placeholder: 'Input',
        width: 250,
        height: 48,
        borderRadius: 12,
        fontSize: 18,
        paddingBottom: 16,
        paddingTop: 16,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'left',
        x: 0,
        y: 0
      }
    },
    {
      name: 'Password Input',
      properties: {
        variant: 'secondary',
        width: 250,
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
      name: 'Dropdown Input',
      properties: {
        variant: 'secondary',
        width: 250,
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
} satisfies SoftComponentSchema
