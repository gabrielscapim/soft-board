import { RequestHandler } from 'express'
import { DeleteMembersCommand } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'

type Handler = RequestHandler<unknown, unknown, DeleteMembersCommand>

const schema = yup.object({
  memberIds: yup.array().of(yup.string()).required()
})

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const { memberIds } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()

    await pool
      .DELETE_FROM`member`
      .WHERE`team_id = ${teamId}`
      .AND`id = ANY(${memberIds})`

    res.status(204).end()
  }
}
