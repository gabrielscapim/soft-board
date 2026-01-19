import { RequestHandler } from 'express'
import { GetAuthenticatedUserResult } from 'types/endpoints/getAuthenticatedUser'
import { UserDatabase, UserPreferencesDatabase } from 'types/database'
import { getPool } from '../../libs'

export const auth = false

type Handler = RequestHandler<unknown, GetAuthenticatedUserResult>

type UserRow = Pick<UserDatabase, 'id' | 'name' | 'email'>

type UserPreferencesRow = Pick<UserPreferencesDatabase, 'language'>

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
      .SELECT<{ slug: string; role: 'member' | 'admin' | 'owner' }>`
        team.slug,
        member.role
      `
      .FROM`team`
      .LEFT_JOIN`member ON member."team_id" = team.id`
      .WHERE`member."user_id" = ${user.id}`
      .ORDER_BY`
        CASE member.role
          WHEN 'owner' THEN 1
          WHEN 'admin' THEN 2
          WHEN 'member' THEN 3
          ELSE 3
        END
      `
      .first()

    const preferences = await pool
      .SELECT<UserPreferencesRow>`language`
      .FROM`user_preferences`
      .WHERE`user_id = ${auth.userId}`
      .first()

    const result: GetAuthenticatedUserResult = {
      userId: user.id,
      name: user.name,
      email: user.email,
      fallbackTeam: fallbackTeam ? { slug: fallbackTeam.slug } : null,
      preferences: {
        language: preferences ? preferences.language : 'en'
      }
    }

    res.status(200).json(result)
  }
}
