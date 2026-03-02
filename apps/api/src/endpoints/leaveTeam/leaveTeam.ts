import { RequestHandler } from 'express'
import { createAppHttpError } from '../../libs'
import { MemberDatabase } from 'types/database'
import { GetApplicationDependencies } from '../../types'

type MemberRow = Pick<MemberDatabase, 'id' | 'role'>

export function handler (getDeps: GetApplicationDependencies): RequestHandler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const userId = req.auth!.userId

    const { pool } = getDeps()

    const member = await pool
      .SELECT<MemberRow>`id, role`
      .FROM`member`
      .WHERE`team_id = ${teamId}`
      .AND`user_id = ${userId}`
      .find({ error: 'You are not a member of this team' })

    if (member.role === 'owner') {
      throw createAppHttpError(400, 'CANNOT_LEAVE_AS_OWNER', 'You cannot leave a team if you are the owner.')
    }

    await pool
      .DELETE_FROM`member`
      .WHERE`id = ${member.id}`
      .AND`team_id = ${teamId}`
      .AND`user_id = ${userId}`

    res.status(204).end()
  }
}
