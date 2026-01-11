import { DatabasePool } from 'pg-script'
import { AgentContext, RunToolResult, Tool } from '../../../startflow-agent'
import { ApplicationDependencies } from '../../../types'

type Arguments = {
  title: string
  description?: string | null
}

const MAX_REQUIREMENTS_PER_BOARD = 15

export class CreateRequirementTool extends Tool {
  name = 'create_requirement'
  description = 'Creates a new requirement.'
  generateCompletion = true

  parametersSchema () {
    return {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'The title of the requirement.'
        },
        description: {
          type: 'string',
          description: 'A description of the requirement.'
        }
      },
      required: ['title']
    }
  }

  async run (args: Arguments, context: AgentContext): Promise<RunToolResult> {
    const { pool, websocketEmitters } = this.data as { pool: DatabasePool, websocketEmitters: ApplicationDependencies['websocketEmitters'] }

    const { rows: [{ count }] } = await pool
      .SELECT<{ count: number }>`COUNT(*) AS count`
      .FROM`requirement`
      .WHERE`board_id = ${context.board.id}`

    if (count >= MAX_REQUIREMENTS_PER_BOARD) {
      return {
        content: `Maximum of ${MAX_REQUIREMENTS_PER_BOARD} requirements per board reached`
      }
    }

    const { rows: [max] } = await pool
      .SELECT<{ order: number }>`MAX("order") AS order`
      .FROM`requirement`
      .WHERE`board_id = ${context.board.id}`

    const order = max?.order ? max.order + 1 : 0

    await pool.transaction(async pool => {
      const { rows: [requirement] } = await pool
        .INSERT_INTO`requirement`
        .VALUES({
          teamId: context.team.id,
          boardId: context.board.id,
          title: args.title,
          description: args.description ?? null,
          order
        })
        .RETURNING<{ id: string }>`id`

      await pool
        .UPDATE`board`
        .SET({ updateDate: new Date() })
        .WHERE`id = ${context.board.id}`

      return requirement
    })

    websocketEmitters.agentUpdatedRequirements.emit({ boardId: context.board.id })

    return {
      content: 'Requirement created successfully.'
    }
  }
}
