import { schema } from './schema'
import { AgentContext, RunToolResult, Tool } from '../../../../soft-board-agent'
import { randomUUID } from 'crypto'
import { DatabasePool } from 'pg-script'

type Arguments = {
  screens: Array<{
    name: string
    components: Array<{
      name: string
      type: string
      // Sometimes the AI might include the screenNameConnection inside properties, sometimes outside. This is to handle both cases without breaking.
      screenNameConnection?: string | null
      properties: Record<string, any> & { screenNameConnection?: string | null }
    }>
  }>
}

type SoftComponent = {
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

    const screens = screensWithId.map<SoftComponent>((screen, index) => ({
      id: screen.id,
      screenId: null,
      connectionId: null,
      name: screen.name,
      type: 'mobileScreen',
      properties: {
        x: index * 375 + index * 60,
        y: 0,
        width: 375,
        height: 812,
        main: index === 0
      }
    }))

    const components = screensWithId.flatMap<SoftComponent>((screen, index) =>
      screen.components.map(component => {
        const screenNameConnection =
          component.screenNameConnection ?? component.properties.screenNameConnection ?? null

        return {
          id: randomUUID(),
          screenId: screen.id,
          name: component.name,
          type: component.type,
          connectionId: screensWithId.find(s => s.name === screenNameConnection)?.id ?? null,
          properties: {
            ...component.properties,
            x: index * 375 + index * 60 + (component.properties.x ?? 0)
          }
        }
      })
    )

    const softComponents = [...screens, ...components]

    await pool.transaction(async pool => {
      const boardGeneration = await pool
        .SELECT`id`
        .FROM`board_generation`
        .WHERE`tool_call_id = ${boardGenerationToolCallId}`
        .find()

      for (const component of softComponents) {
        await pool
          .INSERT_INTO`component`
          .VALUES({
            id: component.id,
            boardId: context.board.id,
            teamId: context.team.id,
            screenId: component.screenId,
            connectionId: component.connectionId,
            name: component.name,
            type: component.type,
            properties: component.properties,
            boardGenerationId: boardGeneration.id
          })
      }

      await pool
        .UPDATE`board_generation`
        .SET({
          status: 'completed',
          generationDate: new Date(),
          updateDate: new Date()
        })
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
