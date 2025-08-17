import { AgentContext, RunToolResult, Tool } from '../../../startflow-agent'

type Arguments = {
  components: Array<{
    name: string
    type: 'button' | 'divider' | 'icon' | 'input' | 'mobileScreen' | 'radioButton' | 'shape' | 'text' | 'toggle'
    properties: Record<string, any>
  }>
}

export class CreateWireflowTool extends Tool {
  name = 'create_wireflows'
  description = 'Create wireflows'

  parametersSchema () {
    return {
      type: 'object',
      properties: {
        components: {
          type: 'array',
          items: {
            oneOf: [
              // Button
              {
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
                          color: { type: 'string', enum: ['primary', 'secondary'] },
                          borderRadius: { type: 'number' },
                          fontSize: { type: 'number' },
                          paddingLeft: { type: 'number' },
                          paddingRight: { type: 'number' },
                          paddingTop: { type: 'number' },
                          paddingBottom: { type: 'number' },
                          label: { type: 'string' }
                        },
                        additionalProperties: false
                      }
                    ]
                  }
                },
                required: ['name', 'type', 'properties'],
                additionalProperties: false
              },
              // Divider
              {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  type: { const: 'divider', type: 'string' },
                  properties: {
                    allOf: [
                      { $ref: '#/$defs/baseProperties' },
                      {
                        type: 'object',
                        properties: {
                          color: { type: 'string', enum: ['primary', 'secondary', 'tertiary'] }
                        },
                        additionalProperties: false
                      }
                    ]
                  }
                },
                required: ['name', 'type', 'properties'],
                additionalProperties: false
              },
              // Icon
              {
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
                          color: { type: 'string', enum: ['primary', 'secondary'] },
                          icon: { type: 'string' }
                        },
                        additionalProperties: false
                      }
                    ]
                  }
                },
                required: ['name', 'type', 'properties'],
                additionalProperties: false
              },
              // Input
              {
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
                          variant: { type: 'string', enum: ['primary', 'secondary', 'tertiary'] },
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
              },
              // MobileScreen
              {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  type: { const: 'mobileScreen', type: 'string' },
                  properties: { $ref: '#/$defs/baseProperties' }
                },
                required: ['name', 'type', 'properties'],
                additionalProperties: false
              },
              // RadioButton
              {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  type: { const: 'radioButton', type: 'string' },
                  properties: {
                    allOf: [
                      { $ref: '#/$defs/baseProperties' },
                      {
                        type: 'object',
                        properties: {
                          activated: { type: 'boolean' }
                        },
                        additionalProperties: false
                      }
                    ]
                  }
                },
                required: ['name', 'type', 'properties'],
                additionalProperties: false
              },
              // Shape
              {
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
                          color: { type: 'string', enum: ['primary', 'secondary'] },
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
              },
              // Text
              {
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
                          color: { type: 'string', enum: ['primary', 'secondary'] },
                          text: { type: 'string' },
                          fontSize: { type: 'number' },
                          decoration: { type: 'string', enum: ['none', 'underline', 'line-through', 'overline'] },
                          fontWeight: { type: 'number' },
                          lineHeight: { type: 'number' },
                          align: { type: 'string', enum: ['left', 'center', 'right', 'justify'] }
                        },
                        additionalProperties: false
                      }
                    ]
                  }
                },
                required: ['name', 'type', 'properties'],
                additionalProperties: false
              },
              // Toggle
              {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  type: { const: 'toggle', type: 'string' },
                  properties: {
                    allOf: [
                      { $ref: '#/$defs/baseProperties' },
                      {
                        type: 'object',
                        properties: {
                          activated: { type: 'boolean' }
                        },
                        additionalProperties: false
                      }
                    ]
                  }
                },
                required: ['name', 'type', 'properties'],
                additionalProperties: false
              }
            ]
          }
        }
      },
      required: ['components'],
      additionalProperties: false,
      $defs: {
        baseProperties: {
          type: 'object',
          properties: {
            x: { type: 'number' },
            y: { type: 'number' },
            width: { type: 'number' },
            height: { type: 'number' },
            zIndex: { type: 'number' }
          },
          required: ['x', 'y', 'width', 'height'],
          additionalProperties: false
        }
      },
      strict: true
    }
  }

  async run (args: Arguments, context: AgentContext): Promise<RunToolResult> {
    await this.pool.transaction(async pool => {
      for (const component of args.components) {
        await pool
          .INSERT_INTO`component`
          .VALUES({
            teamId: context.team.id,
            boardId: context.board.id,
            name: component.name,
            type: component.type,
            properties: JSON.stringify(component.properties)
          })
      }
    })

    return {
      content: `Wireflows created with components ${JSON.stringify(args.components)}`
    }
  }
}
