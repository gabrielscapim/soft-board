import { RequestHandler } from 'express'
import { GetAuthenticatedUserResult } from 'types/endpoints/getAuthenticatedUser'
import { UserDatabase, UserPreferencesDatabase } from 'types/database'
import { getPool } from '../../libs'

export const auth = false

type Handler = RequestHandler<unknown, GetAuthenticatedUserResult>

type UserRow = Pick<UserDatabase, 'id' | 'name' | 'email'>

type UserPreferencesRow = Pick<UserPreferencesDatabase, 'language' | 'acceptedTutorial'>

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
      .AND`member.role = 'owner'`
      .ORDER_BY`team.create_date ASC`
      .first()

    const preferences = await pool
      .SELECT<UserPreferencesRow>`language, accepted_tutorial`
      .FROM`user_preferences`
      .WHERE`user_id = ${auth.userId}`
      .first()

    const result: GetAuthenticatedUserResult = {
      userId: user.id,
      name: user.name,
      email: user.email,
      fallbackTeam: fallbackTeam ? { slug: fallbackTeam.slug } : null,
      preferences: {
        language: preferences ? preferences.language : 'en',
        acceptedTutorial: preferences ? preferences.acceptedTutorial : null
      }
    }

    res.status(200).json(result)
  }
}
