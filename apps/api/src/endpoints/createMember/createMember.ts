import { RequestHandler } from 'express'
import { MemberDatabase } from 'types/database'
import { CreateMemberCommand, CreateMemberResult } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'
import { Conflict } from 'http-errors'

type Handler = RequestHandler<unknown, CreateMemberResult, CreateMemberCommand>

type MemberRow = Pick<MemberDatabase, 'id' | 'role'>

const schema = yup.object({
  userId: yup.string().uuid().required(),
  role: yup.string().oneOf(['member', 'admin']).required()
})

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const { userId, role } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()

    await pool
      .SELECT`id`
      .FROM`"user"`
      .WHERE`id = ${userId}`
      .find({ error: `User with id ${userId} not found` })

    const member = await pool
      .SELECT`id`
      .FROM`member`
      .WHERE`user_id = ${userId}`
      .AND`team_id = ${teamId}`
      .first()

    if (member) {
      throw new Conflict(`User with id ${userId} is already a member of the team`)
    }

    const { rows: [created] } = await pool
      .INSERT_INTO`member`
      .VALUES({
        userId,
        teamId,
        role
      })
      .RETURNING<MemberRow>`id, role`

    res.status(201).json({ id: created.id })
  }
}
