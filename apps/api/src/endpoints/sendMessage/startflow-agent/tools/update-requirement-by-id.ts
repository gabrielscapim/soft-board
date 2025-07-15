import { Tool } from '../core'

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

  async run (args: Arguments): Promise<string> {
    const board = await this.pool
      .SELECT`id`
      .FROM`board`
      .WHERE`id = ${this.boardId}`
      .first()

    if (!board) {
      return `Board with ID "${this.boardId}" not found`
    }

    const requirement = await this.pool
      .SELECT`id`
      .FROM`requirement`
      .WHERE`id = ${args.id}`
      .AND`board_id = ${board.id}`
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
        .WHERE`id = ${board.id}`
      }
    )

    return `Requirement with ID "${args.id}" updated successfully.`
  }
}
