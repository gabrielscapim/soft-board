const baseProperties = {
  type: 'object',
  properties: {
    x: { type: 'number' },
    y: { type: 'number' },
    width: { type: 'number' },
    height: { type: 'number' },
    zIndex: { type: 'number' }
  },
  required: ['x', 'y', 'width', 'height', 'zIndex'],
  additionalProperties: false
} as const

const buttonSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    type: { const: 'button', type: 'string' },
    properties: {
      allOf: [
        { $ref: '#/$defs/baseProperties' },
        {
          type: 'object',
          properties: {
            screenNameConnection: { type: 'string' },
            borderRadius: { type: 'number' },
            fontSize: { type: 'number' },
            paddingLeft: { type: 'number' },
            paddingRight: { type: 'number' },
            paddingTop: { type: 'number' },
            paddingBottom: { type: 'number' },
            label: { type: 'string' },
            icon: { type: 'string' },
            color: { type: 'string', enum: ['primary', 'secondary'] }
          },
          additionalProperties: false
        }
      ]
    }
  },
  required: ['name', 'type', 'properties'],
  additionalProperties: false
} as const

const dividerSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    type: { const: 'divider', type: 'string' },
    properties: {
      allOf: [
        { $ref: '#/$defs/baseProperties' }
      ]
    }
  },
  required: ['name', 'type', 'properties'],
  additionalProperties: false
} as const

const iconSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    type: { const: 'icon', type: 'string' },
    properties: {
      allOf: [
        { $ref: '#/$defs/baseProperties' },
        {
          type: 'object',
          properties: {
            icon: { type: 'string' }
          },
          additionalProperties: false
        }
      ]
    }
  },
  required: ['name', 'type', 'properties'],
  additionalProperties: false
} as const

const inputSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    type: { const: 'input', type: 'string' },
    properties: {
      allOf: [
        { $ref: '#/$defs/baseProperties' },
        {
          type: 'object',
          properties: {
            borderRadius: { type: 'number' },
            fontSize: { type: 'number' },
            paddingLeft: { type: 'number' },
            paddingRight: { type: 'number' },
            paddingTop: { type: 'number' },
            paddingBottom: { type: 'number' },
            rightIcon: { type: 'string' },
            leftIcon: { type: 'string' },
            placeholder: { type: 'string' },
            textAlign: { type: 'string', enum: ['left', 'center', 'right'] }
          },
          additionalProperties: false
        }
      ]
    }
  },
  required: ['name', 'type', 'properties'],
  additionalProperties: false
} as const

const radioButtonSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    type: { const: 'radioButton', type: 'string' },
    properties: {
      allOf: [
        { $ref: '#/$defs/baseProperties' }
      ]
    }
  },
  required: ['name', 'type', 'properties'],
  additionalProperties: false
} as const

const shapeSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    type: { const: 'shape', type: 'string' },
    properties: {
      allOf: [
        { $ref: '#/$defs/baseProperties' },
        {
          type: 'object',
          properties: {
            fill: { type: 'boolean' },
            borderRadius: { type: 'number' },
            borderWidth: { type: 'number' }
          },
          additionalProperties: false
        }
      ]
    }
  },
  required: ['name', 'type', 'properties'],
  additionalProperties: false
} as const

const textSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    type: { const: 'text', type: 'string' },
    properties: {
      allOf: [
        { $ref: '#/$defs/baseProperties' },
        {
          type: 'object',
          properties: {
            screenNameConnection: { type: 'string' },
            text: { type: 'string' },
            fontSize: { type: 'number' },
            decoration: { type: 'string', enum: ['none', 'underline', 'line-through', 'overline'] },
            fontWeight: { type: 'number' },
            align: { type: 'string', enum: ['left', 'center', 'right', 'justify'] }
          },
          additionalProperties: false
        }
      ]
    }
  },
  required: ['name', 'type', 'properties'],
  additionalProperties: false
} as const

const toggleSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    type: { const: 'toggle', type: 'string' },
    properties: {
      allOf: [
        { $ref: '#/$defs/baseProperties' }
      ]
    }
  },
  required: ['name', 'type', 'properties'],
  additionalProperties: false
} as const

export const schema = {
  type: 'object',
  properties: {
    screens: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          components: {
            type: 'array',
            items: {
              oneOf: [
                buttonSchema,
                dividerSchema,
                iconSchema,
                inputSchema,
                radioButtonSchema,
                shapeSchema,
                textSchema,
                toggleSchema
              ]
            }
          }
        },
        required: ['name', 'type', 'properties', 'components'],
        additionalProperties: false
      }
    }
  },
  required: ['screens'],
  additionalProperties: false,
  $defs: {
    baseProperties
  },
  strict: true
} as const

