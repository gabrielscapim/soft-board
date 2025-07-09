import { RequestHandler } from 'express'
import { getPool } from '../../libs'
import { MemberDatabase } from 'types/database'
import { BadRequest } from 'http-errors'

type MemberRow = Pick<MemberDatabase, 'id' | 'role'>

export function handler (): RequestHandler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const userId = req.auth!.userId

    const pool = getPool()

    const member = await pool
      .SELECT<MemberRow>`id, role`
      .FROM`member`
      .WHERE`team_id = ${teamId}`
      .AND`user_id = ${userId}`
      .find({ error: 'You are not a member of this team' })

    if (member.role === 'owner') {
      throw new BadRequest('You cannot leave a team if you are the owner.')
    }

    await pool
      .DELETE_FROM`member`
      .WHERE`id = ${member.id}`
      .AND`team_id = ${teamId}`
      .AND`user_id = ${userId}`

    res.status(204).end()
  }
}
