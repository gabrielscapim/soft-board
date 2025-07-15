import { BoardDatabase } from 'types/database'
import { Tool } from '../core'

type Arguments = {
  title: string
  description?: string | null
}

type BoardRow = Pick<BoardDatabase, 'id' | 'teamId'>

const MAX_REQUIREMENTS_PER_BOARD = 15

export class CreateRequirementTool extends Tool {
  name = 'create_requirement'
  description = 'Creates a new requirement.'

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

  async run (args: Arguments): Promise<string> {
    const board = await this.pool
      .SELECT<BoardRow>`id, team_id`
      .FROM`board`
      .WHERE`id = ${this.boardId}`
      .first()

    if (!board) {
      return `Board with ID "${this.boardId}" not found`
    }

    const { rows: [{ count }] } = await this.pool
      .SELECT<{ count: number }>`COUNT(*) AS count`
      .FROM`requirement`
      .WHERE`board_id = ${this.boardId}`

    if (count >= MAX_REQUIREMENTS_PER_BOARD) {
      return `Maximum of ${MAX_REQUIREMENTS_PER_BOARD} requirements per board reached`
    }

    const { rows: [max] } = await this.pool
      .SELECT<{ order: number }>`MAX("order") AS order`
      .FROM`requirement`
      .WHERE`board_id = ${this.boardId}`

    const order = max?.order ? max.order + 1 : 0

    await this.pool.transaction(async pool => {
      const { rows: [requirement] } = await pool
        .INSERT_INTO`requirement`
        .VALUES({
          teamId: board.teamId,
          boardId: board.id,
          title: args.title,
          description: args.description ?? null,
          order
        })
        .RETURNING<{ id: string }>`id`

      await pool
        .UPDATE`board`
        .SET({ updateDate: new Date() })
        .WHERE`id = ${board.id}`

      return requirement
    })

    return 'Requirement created successfully.'
  }
}
