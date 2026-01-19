import { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import { ResetPasswordCommand } from 'types/endpoints'
import * as yup from 'yup'
import crypto from 'crypto'
import { createAppHttpError, getPool } from '../../libs'
import { PasswordResetTokenDatabase } from 'types/database'
import { PASSWORD_SALT_ROUNDS } from '../../constants'

type Handler = RequestHandler<unknown, unknown, ResetPasswordCommand>

const schema = yup.object({
  token: yup.string().trim().required(),
  newPassword: yup.string().trim().min(8).max(32).required()
})

export const auth = false

type PasswordResetTokenRow = Pick<PasswordResetTokenDatabase, 'id' | 'userId' | 'expireDate' | 'useDate'>

export function handler (): Handler {
  return async (req, res) => {
    const { token, newPassword } = await schema.validate(req.body, { abortEarly: false })

    const pool = getPool()

    const now = new Date()
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')

    const passwordResetToken = await pool
      .SELECT<PasswordResetTokenRow>`id, user_id, expire_date, use_date`
      .FROM`password_reset_token`
      .WHERE`token_hash = ${tokenHash}`
      .first()

    if (!passwordResetToken) {
      throw createAppHttpError(404, 'PASSWORD_RESET_TOKEN_NOT_FOUND', 'Password reset token not found')
    }

    if (passwordResetToken.useDate) {
      throw createAppHttpError(400, 'PASSWORD_RESET_TOKEN_ALREADY_USED', 'Password reset token has already been used')
    }

    if (passwordResetToken.expireDate < now) {
      throw createAppHttpError(400, 'PASSWORD_RESET_TOKEN_EXPIRED', 'Password reset token has expired')
    }

    const passwordHash = await bcrypt.hash(newPassword, PASSWORD_SALT_ROUNDS)

    await pool.transaction(async pool => {
      await pool
        .UPDATE`"user"`
        .SET`password_hash = ${passwordHash}`
        .WHERE`id = ${passwordResetToken.userId}`

      await pool
        .UPDATE`password_reset_token`
        .SET`use_date = NOW()`
        .WHERE`id = ${passwordResetToken.id}`
    })

    res.status(204).end()
  }
}
