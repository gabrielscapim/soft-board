import { CookieOptions, RequestHandler } from 'express'
import { createHash } from 'crypto'
import * as yup from 'yup'
import { VerifySignUpCommand, VerifySignUpResult } from 'types/endpoints'
import { createAppHttpError, getPool } from '../../libs'
import { BadRequest } from 'http-errors'
import jwt from 'jsonwebtoken'
import { AUTHENTICATION_COOKIE_NAME, JWT_SECRET, NODE_ENV } from '../../constants'
import slugify from 'slugify'
import { nanoid } from 'nanoid'
import { AuthenticationData } from '../../types'

type Handler = RequestHandler<any, VerifySignUpResult, VerifySignUpCommand>

const schema = yup.object({
  code: yup.string().length(6).required()
})

const tokenSchema = yup.string().required()
/**
 * The verifySignUp endpoint does not require authentication.
 */
export const auth = false

const EIGHT_HOURS_IN_MS = 8 * 60 * 60 * 1000

export function handler (): Handler {
  return async (req, res) => {
    const { code } = schema.validateSync(req.body)
    const token = req.header('soft-board-sign-up-form')

    const validatedToken = tokenSchema.validateSync(token)

    const pool = getPool()

    const jwtPayload = jwt.verify(validatedToken, JWT_SECRET) as { signUpFormId?: string } | undefined
    const signUpFormId = jwtPayload?.signUpFormId

    if (!signUpFormId) {
      throw new BadRequest('Invalid token')
    }

    const now = new Date()
    const codeHash = createHash('sha256').update(code).digest('hex')

    const signUpForm = await pool
      .SELECT`name, email, normalized_email, password_hash, expire_date, use_date`
      .FROM`sign_up_form`
      .WHERE`id = ${signUpFormId}`
      .AND`code_hash = ${codeHash}`
      .first()

    if (!signUpForm) {
      throw createAppHttpError(404, 'SIGN_UP_CODE_INVALID', 'The provided code is invalid')
    }

    if (signUpForm.useDate) {
      throw createAppHttpError(409, 'SIGN_UP_CODE_ALREADY_USED', 'This code has already been used')
    }

    if (signUpForm.expireDate.getTime() < now.getTime()) {
      throw createAppHttpError(409, 'SIGN_UP_CODE_EXPIRED', 'This code has expired')
    }

    const result = await pool.transaction(async pool => {
      await pool
        .UPDATE`sign_up_form`
        .SET`use_date = ${now}`
        .WHERE`id = ${signUpFormId}`

      const { rows: [user] } = await pool
        .INSERT_INTO`"user"`
        .VALUES({
          name: signUpForm.name,
          email: signUpForm.email,
          normalizedEmail: signUpForm.normalized_email,
          passwordHash: signUpForm.password_hash
        })
        .RETURNING`id`

      await pool
        .INSERT_INTO`user_preferences`
        .VALUES({
          userId: user.id,
          language: 'pt-BR'
        })

      const baseSlug = slugify(signUpForm.name, { lower: true, strict: true })
      const slug = `${baseSlug}-${nanoid(8)}`

      const { rows: [team] } = await pool
        .INSERT_INTO`team`
        .VALUES({
          name: `${signUpForm.name}'s Team`,
          slug
        })
        .RETURNING`id`

      await pool
        .INSERT_INTO`member`
        .VALUES({
          userId: user.id,
          teamId: team.id,
          role: 'owner'
        })

      const result: VerifySignUpResult = {
        userId: user.id,
        name: signUpForm.name,
        email: signUpForm.email,
        fallbackTeam: {
          slug
        },
        preferences: {
          language: 'pt-BR'
        }
      }

      return result
    })

    const cookieOptions: CookieOptions = {
      signed: true,
      httpOnly: true,
      secure: NODE_ENV === 'production', // Secure is used to ensure the cookie is sent over HTTPS only
      partitioned: NODE_ENV === 'production', // Partitioned is used to prevent cross-site tracking
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax', // SameSite is set to 'none' for cross-site requests in production, 'lax' otherwise. Lax is more secure for same-site requests
      maxAge: EIGHT_HOURS_IN_MS
    }

    const authenticationData: AuthenticationData = {
      userId: result.userId
    }

    res
      .status(201)
      .cookie(AUTHENTICATION_COOKIE_NAME, JSON.stringify(authenticationData), cookieOptions)
      .json(result)
  }
}
