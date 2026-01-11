import { DatabasePool } from 'pg-script'
import { AgentContext, RunToolResult, Tool } from '../../../startflow-agent'
import { ApplicationDependencies } from '../../../types'

type Arguments = {
  id: string
}

export class DeleteRequirementByIdTool extends Tool {
  name = 'delete_requirement_by_id'
  description = 'Deletes a requirement by its ID.'
  generateCompletion = true

  parametersSchema () {
    return {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'The ID of the requirement to delete.' }
      },
      required: ['id']
    }
  }

  async run (args: Arguments, context: AgentContext): Promise<RunToolResult> {
    const { pool, websocketEmitters } = this.data as { pool: DatabasePool, websocketEmitters: ApplicationDependencies['websocketEmitters'] }

    const requirement = await pool
      .SELECT`id`
      .FROM`requirement`
      .WHERE`id = ${args.id}`
      .AND`board_id = ${context.board.id}`
      .first()

    if (!requirement) {
      return {
        content: `Requirement with ID "${args.id}" not found in board "${context.board.id}"`
      }
    }

    await pool.transaction(async pool => {
      await pool
        .DELETE_FROM`requirement`
        .WHERE`id = ${requirement.id}`
        .AND`board_id = ${context.board.id}`

      await pool
        .UPDATE`board`
        .SET({ updateDate: new Date() })
        .WHERE`id = ${context.board.id}`
    })

    const room = `board:${context.board.id}`
    websocketEmitters.agentUpdatedRequirements.emit({ boardId: context.board.id }, [room])

    return {
      content: `Requirement with ID "${args.id}" has been deleted successfully.`
    }
  }
}
