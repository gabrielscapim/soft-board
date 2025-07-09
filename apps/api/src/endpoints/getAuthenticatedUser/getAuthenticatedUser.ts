import { RequestHandler } from 'express'
import { GetAuthenticatedUserResult } from 'types/endpoints/getAuthenticatedUser'
import { UserDatabase } from 'types/database'
import { getPool } from '../../libs'

export const auth = false

type Handler = RequestHandler<unknown, GetAuthenticatedUserResult>

type UserRow = Pick<UserDatabase, 'id' | 'name' | 'email'>

export function handler (): Handler {
  return async (req, res) => {
    const { auth } = req

    if (!auth) {
      res.status(200).json(null)
      return
    }

    const pool = getPool()

    const user = await pool
      .SELECT<UserRow>`id, name, email`
      .FROM`"user"`
      .WHERE`id = ${auth.userId}`
      .find({ error: 'User not found' })

    const fallbackTeam = await pool
      .SELECT<{ slug: string }>`slug`
      .FROM`team`
      .LEFT_JOIN`member ON member."team_id" = team.id`
      .WHERE`member."user_id" = ${auth.userId}`
      .ORDER_BY`team.create_date ASC`
      .first()

    const result: GetAuthenticatedUserResult = {
      userId: user.id,
      name: user.name,
      email: user.email,
      fallbackTeam: fallbackTeam ? { slug: fallbackTeam.slug } : null
    }

    res.status(200).json(result)
  }
}
