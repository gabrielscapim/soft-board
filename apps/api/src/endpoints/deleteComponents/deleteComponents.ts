import { RequestHandler } from 'express'
import { DeleteComponentsCommand } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission, getPool } from '../../libs'

type Handler = RequestHandler<unknown, unknown, DeleteComponentsCommand>

const schema = yup.object({
  boardId: yup.string().required(),
  componentIds: yup.array().of(yup.string().required()).required()
})

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const { boardId, componentIds } = schema.validateSync(req.body, { abortEarly: false })

    assertMemberPermission(req.team!.memberRole, ['admin', 'owner'], 'Only team admins and owners can delete components')

    const pool = getPool()

    await pool
      .DELETE_FROM`component`
      .WHERE`id = ANY(${componentIds})`
      .AND`board_id = ${boardId}`
      .AND`team_id = ${teamId}`

    res.status(204).end()
  }
}
