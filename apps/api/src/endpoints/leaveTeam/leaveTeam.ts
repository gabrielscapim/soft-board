import { RequestHandler } from 'express'
import { getPool } from '../../libs'

export function handler (): RequestHandler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const userId = req.auth!.userId

    const pool = getPool()

    const member = await pool
      .SELECT`id`
      .FROM`member`
      .WHERE`team_id = ${teamId}`
      .AND`user_id = ${userId}`
      .find({ error: 'You are not a member of this team' })

    await pool
      .DELETE_FROM`member`
      .WHERE`id = ${member.id}`
      .AND`team_id = ${teamId}`
      .AND`user_id = ${userId}`

    res.status(204).end()
  }
}
