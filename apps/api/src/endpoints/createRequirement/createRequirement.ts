import { RequestHandler } from 'express'
import { CreateRequirementCommand, CreateRequirementResult } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission, createAppHttpError, getPool } from '../../libs'

type Handler = RequestHandler<unknown, CreateRequirementResult, CreateRequirementCommand>

const schema = yup.object({
  boardId: yup.string().trim().required('Board ID is required'),
  title: yup.string().trim().nullable().max(100, 'Title must be at most 100 characters long'),
  description: yup.string().trim().nullable().max(500, 'Description must be at most 500 characters long')
})

const MAX_REQUIREMENTS_PER_BOARD = 15

export function handler (): Handler {
  return async (req, res) => {
    const userId = req.auth?.userId
    const teamId = req.team!.teamId
    const { boardId, title, description } = schema.validateSync(req.body, { abortEarly: false })

    assertMemberPermission(req.team!.memberRole, ['admin', 'owner'], 'Only team admins and owners can create requirements')

    const pool = getPool()

    const board = await pool
      .SELECT`id`
      .FROM`board`
      .WHERE`id = ${boardId}`
      .AND`team_id = ${teamId}`
      .find({ error: `Board with ID "${boardId}" not found in team with ID "${teamId}"` })

    const { rows: [{ count }] } = await pool
      .SELECT<{ count: number }>`COUNT(*) AS count`
      .FROM`requirement`
      .WHERE`board_id = ${board.id}`
      .AND`team_id = ${teamId}`

    if (count >= MAX_REQUIREMENTS_PER_BOARD) {
      throw createAppHttpError(400, 'MAX_REQUIREMENTS_REACHED', 'The maximum number of requirements for this board has been reached')
    }

    const { rows: [max] } = await pool
      .SELECT<{ order: number }>`MAX("order") AS order`
      .FROM`requirement`
      .WHERE`board_id = ${board.id}`
      .AND`team_id = ${teamId}`

    const order = max?.order ? max.order + 1 : 0

    const created = await pool.transaction(async pool => {
      const { rows: [requirement] } = await pool
        .INSERT_INTO`requirement`
        .VALUES({
          teamId,
          boardId: board.id,
          authorId: userId,
          title,
          description,
          order
        })
        .RETURNING<{ id: string }>`id`

      await pool
        .UPDATE`board`
        .SET({ updateDate: new Date() })
        .WHERE`id = ${board.id}`

      return requirement
    })

    const result: CreateRequirementResult = {
      id: created.id
    }

    res.status(201).json(result)
  }
}
