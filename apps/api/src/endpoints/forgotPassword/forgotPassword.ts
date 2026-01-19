import * as yup from 'yup'
import { RequestHandler } from 'express'
import { ForgotPasswordCommand } from 'types/endpoints'
import { getPool, logger } from '../../libs'
import crypto from 'crypto'
import { addHours } from 'date-fns'
import { GetApplicationDependencies } from '../../types'
import { FRONTEND_BASE_URL } from '../../constants'

type Handler = RequestHandler<unknown, unknown, ForgotPasswordCommand>

const schema = yup.object({
  email: yup.string().email().trim().required()
})

export const auth = false

export function handler (getDeps: GetApplicationDependencies): Handler {
  return async (req, res) => {
    const { email } = await schema.validate(req.body, { abortEarly: false })
    const { sendMail } = getDeps()

    const pool = getPool()

    const normalizedEmail = email.toUpperCase().trim()

    const user = await pool
      .SELECT`id`
      .FROM`"user"`
      .WHERE`normalized_email = ${normalizedEmail}`
      .first()

    if (!user) {
      res.status(204).end()
      return
    }

    const token = crypto.randomBytes(24).toString('hex')
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
    const now = new Date()
    const expireDate = addHours(now, 1)

    await pool.transaction(async pool => {
      // Invalidate any available tokens for the user
      await pool
        .UPDATE`password_reset_token`
        .SET`expire_date = NOW()`
        .WHERE`user_id = ${user.id}`
        .AND`expire_date > NOW()`

      await pool
        .INSERT_INTO`password_reset_token`
        .VALUES({
          userId: user.id,
          tokenHash,
          expireDate
        })
    })

    const url = new URL(`/reset-password/token=${token}`, FRONTEND_BASE_URL).toString()

    sendMail({
      to: email,
      subject: 'Soft-Board Password Reset',
      text: `You have requested to reset your password. Please click the link below to reset your password:\n\n${url}\n\nIf you did not request this, please ignore this email.`,
      html: `<p>You have requested to reset your password. Please click the link below to reset your password:</p><p><a href="${url}">${url}</a></p><p>If you did not request this, please ignore this email.</p>`
    })
    .catch(err => logger.error({ user, err }, 'Error sending password reset email'))

    res.status(204).end()
  }
}
