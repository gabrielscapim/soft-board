import * as bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import * as yup from 'yup'
import { FRONTEND_BASE_URL, JWT_SECRET, PASSWORD_SALT_ROUNDS } from '../../constants'
import { createHash, randomInt } from 'crypto'
import { addMinutes } from 'date-fns'
import jwt from 'jsonwebtoken'
import { SignUpCommand, SignUpResult } from 'types/endpoints'
import { GetApplicationDependencies } from '../../types'
import { createAppHttpError, getPool } from '../../libs'
import { SignUpFormDatabase } from 'types/database'

type Handler = RequestHandler<any, SignUpResult, SignUpCommand>

const schema = yup.object({
  name: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  password: yup.string().min(8).required()
})

/**
 * The signUp endpoint does not require authentication.
 */
export const auth = false

export function handler (getDeps: GetApplicationDependencies): Handler {
  return async (req, res) => {
    const { name, email, password } = schema.validateSync(req.body)
    const { sendMail } = getDeps()

    const pool = getPool()

    const normalizedEmail = email.toUpperCase()

    const existingUser = await pool
      .SELECT`id`
      .FROM`"user"`
      .WHERE`normalized_email = ${normalizedEmail}`
      .first()

    if (existingUser) {
      throw createAppHttpError(409, 'USER_ALREADY_EXISTS', 'A user with this email already exists')
    }

    const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS)

    const number = randomInt(0, 1_000_000)
    const code = number.toString().padStart(6, '0')
    const codeHash = createHash('sha256').update(code).digest('hex')

    const now = new Date()
    const expireDate = addMinutes(now, 30)

    // Invalidate any previous sign-up forms for this email
    const signUpForm = await pool.transaction(async pool => {
      await pool
        .UPDATE`sign_up_form`
        .SET`expire_date = ${now}`
        .WHERE`normalized_email = ${normalizedEmail}`
        .AND`expire_date > ${now}`

      const { rows: [signUpForm] } = await pool
        .INSERT_INTO<Pick<SignUpFormDatabase, 'id'>>`sign_up_form`
        .VALUES({
          name,
          email,
          normalizedEmail,
          passwordHash,
          codeHash,
          expireDate
        })
        .RETURNING`id`

      return signUpForm
    })

    const token = jwt.sign({ signUpFormId: signUpForm.id }, JWT_SECRET)

    const signUpUrl = new URL(`/verify-email?token=${token}&code=${code}`, FRONTEND_BASE_URL).toString()

    await sendMail({
      to: email,
      subject: 'SoftBoard Email Verification',
      text: `Please verify your email by clicking the following link: ${signUpUrl}`,
      html: `<p>Please verify your email by clicking the following link:</p><p><a href="${signUpUrl}">${signUpUrl}</a></p>`
    })

    res.status(200).json({ token })
  }
}
