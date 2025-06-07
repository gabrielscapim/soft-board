import { FlexComponentSchema } from '../../types'

export const textFlexComponentSchema = {
  variations: [
    {
      name: 'Large Title',
      properties: {
        x: 0,
        y: 0,
        text: 'Large Title',
        fontSize: 32,
        fontWeight: 600,
        lineHeight: 40,
        width: 160,
        height: 40
      }
    },
    {
      name: 'Medium Title',
      properties: {
        x: 0,
        y: 0,
        text: 'Medium Title',
        fontSize: 20,
        fontWeight: 600,
        lineHeight: 32,
        width: 120,
        height: 24
      }
    },
    {
      name: 'Small Title',
      properties: {
        x: 0,
        y: 0,
        text: 'Small Title',
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 24,
        width: 100,
        height: 20
      }
    },
    {
      name: 'Regular Text',
      properties: {
        x: 0,
        y: 0,
        text: 'Description text about something',
        fontSize: 16,
        fontWeight: 300,
        lineHeight: 24,
        width: 300,
        height: 40
      }
    },
    {
      name: 'Small Text',
      properties: {
        x: 0,
        y: 0,
        text: 'Description text about something',
        fontSize: 14,
        fontWeight: 300,
        lineHeight: 20,
        width: 300,
        height: 40
      }
    }
  ]
} satisfies FlexComponentSchema
