import { CookieOptions, RequestHandler } from 'express'
import { SignInCommand, SignInResult } from 'types/endpoints'
import { UserDatabase } from 'types/database'
import * as yup from 'yup'
import * as bcrypt from 'bcrypt'
import { getPool } from '../../libs'
import { Unauthorized } from 'http-errors'
import { AuthenticationData, IPublisher } from '../../types'
import { AUTHENTICATION_COOKIE_NAME, NODE_ENV } from '../../constants'
import { UserSignedInEvent } from 'event-types'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().trim().min(6).required()
})

export const auth = false

const EIGHT_HOURS_IN_MS = 8 * 60 * 60 * 1000

type Handler = RequestHandler<unknown, SignInResult, SignInCommand>

type UserRow = Pick<UserDatabase, 'id' | 'name' | 'passwordHash'>

type Deps = {
  userSignedIn: IPublisher<UserSignedInEvent>
}

export function handler (deps: Deps): Handler {
  return async (req, res) => {
    const { email, password } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()

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
      throw new Unauthorized('Invalid email or password')
    }

    const fallbackTeam = await pool
      .SELECT<{ slug: string, role: 'member' | 'admin' | 'owner' }>`team.slug, member.role`
      .FROM`team`
      .LEFT_JOIN`member ON member."team_id" = team.id`
      .WHERE`member."user_id" = ${user.id}`
      .AND`member.role = 'owner'`
      .ORDER_BY`team.create_date ASC`
      .first()

    const result: SignInResult = {
      userId: user.id,
      name: user.name,
      fallbackTeam: fallbackTeam ? { slug: fallbackTeam.slug } : null
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

    deps.userSignedIn.publish({
      userId: user.id,
      eventDate: new Date().toISOString()
    })

    res
      .status(200)
      .cookie(AUTHENTICATION_COOKIE_NAME, JSON.stringify(authenticationData), cookieOptions)
      .json(result)
  }
}
