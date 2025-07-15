import { Tool } from '../core'

type Arguments = {
  id: string
}

export class DeleteRequirementByIdTool extends Tool {
  name = 'delete_requirement_by_id'
  description = 'Deletes a requirement by its ID.'

  parametersSchema () {
    return {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'The ID of the requirement to delete.' }
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

    if (!requirement) {
      return `Requirement with ID "${args.id}" not found in board "${this.boardId}"`
    }

    await this.pool.transaction(async pool => {
      await pool
        .DELETE_FROM`requirement`
        .WHERE`id = ${requirement.id}`
        .AND`board_id = ${board.id}`

      await pool
        .UPDATE`board`
        .SET({ updateDate: new Date() })
        .WHERE`id = ${board.id}`
    })

    return `Requirement with ID "${args.id}" has been deleted successfully.`
  }
}
