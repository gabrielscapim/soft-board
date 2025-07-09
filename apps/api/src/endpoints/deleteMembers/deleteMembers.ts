import { RequestHandler } from 'express'
import { DeleteMembersCommand } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'
import { BadRequest } from 'http-errors'

type Handler = RequestHandler<unknown, unknown, DeleteMembersCommand>

const schema = yup.object({
  memberIds: yup.array().of(yup.string()).required()
})

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const userId = req.auth?.userId
    const { memberIds } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()

    const clientMember = await pool
      .SELECT`id`
      .FROM`member`
      .WHERE`team_id = ${teamId}`
      .AND`user_id = ${userId}`
      .find()

    if (memberIds.includes(clientMember.id)) {
      throw new BadRequest('You cannot delete yourself from the team')
    }

    await pool
      .DELETE_FROM`member`
      .WHERE`team_id = ${teamId}`
      .AND`id = ANY(${memberIds})`

    res.status(204).end()
  }
}
