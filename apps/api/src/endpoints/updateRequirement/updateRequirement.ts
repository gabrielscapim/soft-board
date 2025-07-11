import { RequestHandler } from 'express'
import { UpdateRequirementCommand } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission, getPool } from '../../libs'

type Handler = RequestHandler<unknown, unknown, UpdateRequirementCommand>

const schema = yup.object({
  id: yup.string().trim().required('Requirement ID is required'),
  boardId: yup.string().trim().required('Board ID is required'),
  title: yup.string().trim().nullable().max(100, 'Title must be at most 100 characters long'),
  description: yup.string().trim().nullable().max(500, 'Description must be at most 500 characters long')
})

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const { boardId, id, title, description } = schema.validateSync(req.body, { abortEarly: false })

    assertMemberPermission(req.team!.memberRole, ['admin', 'owner'], 'Only team admins and owners can create requirements')

    const pool = getPool()

    const board = await pool
      .SELECT`id`
      .FROM`board`
      .WHERE`id = ${boardId}`
      .AND`team_id = ${teamId}`
      .find({ error: `Board with ID "${boardId}" not found in team with ID "${teamId}"` })

    const requirement = await pool
      .SELECT`id`
      .FROM`requirement`
      .WHERE`id = ${id}`
      .AND`board_id = ${board.id}`
      .AND`team_id = ${teamId}`
      .find({ error: `Requirement with ID "${id}" not found in board with ID "${board.id}"` })

    await pool.transaction(async pool => {
      const now = new Date()

      await pool
        .UPDATE`requirement`
        .SET({
          title,
          description,
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

    res.status(204).end()
  }
}
