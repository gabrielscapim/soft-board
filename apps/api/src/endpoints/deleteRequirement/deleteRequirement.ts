import { RequestHandler } from 'express'
import { DeleteRequirementCommand } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission, getPool } from '../../libs'

type Handler = RequestHandler<unknown, unknown, DeleteRequirementCommand>

const schema = yup.object({
  id: yup.string().trim().required('Requirement ID is required'),
  boardId: yup.string().trim().required('Board ID is required')
})

export function handler (): Handler {
  return async (req, res) => {
    assertMemberPermission(req.team!.memberRole, ['admin', 'owner'], 'Only team admins and owners can delete requirements')

    const teamId = req.team!.teamId
    const { id, boardId } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()

    const board = await pool
      .SELECT`id`
      .FROM`board`
      .WHERE`id = ${boardId}`
      .AND`team_id = ${teamId}`
      .find({ error: `Board with ID "${boardId}" not found in team with ID "${teamId}"` })

    await pool.transaction(async pool => {
      await pool
        .DELETE_FROM`requirement`
        .WHERE`id = ${id}`
        .AND`board_id = ${board.id}`
        .AND`team_id = ${teamId}`

      await pool
        .UPDATE`board`
        .SET({
          updateDate: new Date()
        })
        .WHERE`id = ${board.id}`
        .AND`team_id = ${teamId}`
    })

    res.status(204).end()
  }
}
