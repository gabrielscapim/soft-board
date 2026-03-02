import { RequestHandler } from 'express'
import { GetCurrentUserRoleResult } from 'types/endpoints/getCurrentUserRole'
import { GetApplicationDependencies } from '../../types'

type Handler = RequestHandler<unknown, GetCurrentUserRoleResult>

export function handler (getDeps: GetApplicationDependencies): Handler {
  return async (req, res) => {
    const teamId = req.team?.teamId
    const userId = req.auth?.userId

    const { pool } = getDeps()

    const member = await pool
      .SELECT<{ role: 'owner' | 'admin' | 'member' }>`role`
      .FROM`member`
      .WHERE`team_id = ${teamId}`
      .AND`user_id = ${userId}`
      .find({ error: 'User is not a member of the team' })

    res.status(200).json({ role: member.role })
  }
}
