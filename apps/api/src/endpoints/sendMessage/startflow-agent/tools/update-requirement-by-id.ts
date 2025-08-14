import { AgentContext, RunToolResult, Tool } from '../core'

type Arguments = {
  id: string
  title?: string | null
  description?: string | null
}

export class UpdateRequirementByIdTool extends Tool {
  name = 'update_requirement_by_id'
  description = 'Updates a requirement by its ID.'

  parametersSchema () {
    return {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'The ID of the requirement to update.' },
        title: { type: 'string', description: 'The new title of the requirement.' },
        description: { type: 'string', description: 'The new description of the requirement.' }
      },
      required: ['id']
    }
  }

  async run (args: Arguments, context: AgentContext): Promise<RunToolResult> {
    const requirement = await this.pool
      .SELECT`id`
      .FROM`requirement`
      .WHERE`id = ${args.id}`
      .AND`board_id = ${context.board.id}`
      .first()

    await this.pool.transaction(async pool => {
      const now = new Date()

      await pool
        .UPDATE`requirement`
        .SET({
          title: args.title,
          description: args.description,
          updateDate: now
        })
        .WHERE`id = ${requirement.id}`

      await pool
        .UPDATE`board`
        .SET({
          updateDate: now
        })
        .WHERE`id = ${context.board.id}`
      }
    )

    return {
      content: `Requirement with ID "${args.id}" updated successfully.`
    }
  }
}
