import { FlexComponentSchema } from '../../types'

export const textFlexComponentSchema = {
  variations: [
    {
      name: 'LargeTitle',
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
      name: 'MediumTitle',
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
      name: 'SmallTitle',
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
      name: 'RegularText',
      properties: {
        x: 0,
        y: 0,
        text: 'Description text about something on this page that can be long or short.',
        fontSize: 16,
        fontWeight: 300,
        lineHeight: 24,
        width: 300,
        height: 60
      }
    },
    {
      name: 'SmallText',
      properties: {
        x: 0,
        y: 0,
        text: 'Description text about something on this page that can be long or short.',
        fontSize: 14,
        fontWeight: 300,
        lineHeight: 20,
        width: 300,
        height: 40
      }
    }
  ]
} satisfies FlexComponentSchema
