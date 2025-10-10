import { schema } from './schema'
import { AgentContext, RunToolResult, Tool } from '../../../../startflow-agent'
import { randomUUID } from 'crypto'
import { DatabasePool } from 'pg-script'

type Arguments = {
  screens: Array<{
    name: string
    components: Array<{
      name: string
      type: string
      screenNameConnection: string | null
      properties: Record<string, any>
    }>
  }>
}

type FlexComponent = {
  id: string
  screenId: string | null
  connectionId: string | null
  name: string
  type: string
  properties: Record<string, any>
}

export class CreateWireflowTool extends Tool {
  name = 'create_wireflows'
  description = 'Creates a new wireflow.'
  generateCompletion = false

  parametersSchema () {
    return schema
  }

  async run (args: Arguments, context: AgentContext): Promise<RunToolResult> {
    const { pool, boardGenerationToolCallId } = this.data as { pool: DatabasePool, boardGenerationToolCallId: string }

    const screensWithId = args.screens.map(screen => ({
      ...screen,
      id: randomUUID()
    }))

    const screens = screensWithId.map<FlexComponent>((screen, index) => ({
      id: screen.id,
      screenId: null,
      connectionId: null,
      name: screen.name,
      type: 'screen',
      properties: {
        x: index * 375 + index * 60,
        y: 0,
        width: 375,
        height: 812
      }
    }))

    const components = screensWithId.flatMap<FlexComponent>((screen, index) =>
      screen.components.map(component => ({
        id: randomUUID(),
        screenId: screen.id,
        name: component.name,
        type: component.type,
        connectionId: screensWithId.find(s => s.name === component.screenNameConnection)?.id ?? null,
        properties: {
          ...component.properties,
          x: index * 375 + index * 60 + (component.properties.x ?? 0)
        }
      }))
    )

    const flexComponents = [...screens, ...components]

    await pool.transaction(async pool => {
      for (const component of flexComponents) {
        await pool
          .INSERT_INTO`flex_component`
          .VALUES({
            id: component.id,
            boardId: context.board.id,
            teamId: context.team.id,
            screenId: component.screenId,
            connectionId: component.connectionId,
            name: component.name,
            type: component.type,
            properties: component.properties
          })
      }

      await pool
        .UPDATE`board_generation`
        .SET({ status: 'completed' })
        .WHERE`tool_call_id = ${boardGenerationToolCallId}`
    })

    return {
      content: 'Wireflows created successfully',
      messages: [
        {
          role: 'assistant',
          content: 'Wireflows created successfully'
        }
      ]
    }
  }
}
