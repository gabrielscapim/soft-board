import { CookieOptions, RequestHandler } from 'express'
import { SignInCommand, SignInResult } from 'types/endpoints'
import { UserDatabase, UserPreferencesDatabase } from 'types/database'
import * as yup from 'yup'
import * as bcrypt from 'bcrypt'
import { createAppHttpError } from '../../libs'
import { AuthenticationData, GetApplicationDependencies } from '../../types'
import { AUTHENTICATION_COOKIE_NAME, NODE_ENV } from '../../constants'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().trim().min(6).required()
})

export const auth = false

const EIGHT_HOURS_IN_MS = 8 * 60 * 60 * 1000

type Handler = RequestHandler<unknown, SignInResult, SignInCommand>

type UserRow = Pick<UserDatabase, 'id' | 'name' | 'passwordHash'>

export function handler (getDeps: GetApplicationDependencies): Handler {
  return async (req, res) => {
    const { email, password } = schema.validateSync(req.body, { abortEarly: false })
    const { pool, publishers } = getDeps()

    const normalizedEmail = email.toUpperCase().trim()

    const user = await pool
      .SELECT<UserRow>`id, name, password_hash`
      .FROM`"user"`
      .WHERE`normalized_email = ${normalizedEmail}`
      .first()

    const isPasswordValid = user?.passwordHash
      ? await bcrypt.compare(password, user.passwordHash)
      : await bcrypt.compare(password, '$2b$10$invalidhashfornonexistentuser')

    if (!user || !isPasswordValid) {
      throw createAppHttpError(401, 'INVALID_CREDENTIALS', 'Invalid email or password')
    }

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

    const userPreferences = await pool
      .SELECT<Pick<UserPreferencesDatabase, 'language'>>`language`
      .FROM`user_preferences`
      .WHERE`user_id = ${user.id}`
      .first()

    const result: SignInResult = {
      userId: user.id,
      name: user.name,
      fallbackTeam: fallbackTeam ? { slug: fallbackTeam.slug } : null,
      preferences: {
        language: userPreferences?.language ?? 'en'
      }
    }

    const authenticationData: AuthenticationData = {
      userId: user.id
    }

    const cookieOptions: CookieOptions = {
      signed: true,
      httpOnly: true,
      secure: NODE_ENV === 'production', // Secure is used to ensure the cookie is sent over HTTPS only
      partitioned: NODE_ENV === 'production', // Partitioned is used to prevent cross-site tracking
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax', // SameSite is set to 'none' for cross-site requests in production, 'lax' otherwise. Lax is more secure for same-site requests
      maxAge: EIGHT_HOURS_IN_MS
    }

    publishers.userSignedIn.publish({
      userId: user.id,
      eventDate: new Date().toISOString()
    })

    res
      .status(200)
      .cookie(AUTHENTICATION_COOKIE_NAME, JSON.stringify(authenticationData), cookieOptions)
      .json(result)
  }
}
