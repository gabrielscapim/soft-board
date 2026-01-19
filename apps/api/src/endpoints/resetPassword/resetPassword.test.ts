import { describe, expect, test } from 'vitest'
import { DatabaseFactory, getPool } from '../../libs'
import { createApp } from '../../setup'
import * as resetPassword from './resetPassword'
import request from 'supertest'
import crypto from 'crypto'

describe('resetPassword', () => {
  describe('when password reset token is valid', async () => {
    test('resets the user password', async () => {
      const pool = getPool()
      const factory = new DatabaseFactory({ pool })
      const user = await factory.createUser({ passwordHash: 'oldHash' })
      const team = await factory.createTeam()
      await factory.createMember({ userId: user.id, teamId: team.id, role: 'owner' })
      const plainTextToken = crypto.randomBytes(24).toString('hex')
      const tokenHash = crypto.createHash('sha256').update(plainTextToken).digest('hex')
      await factory.createPasswordResetToken({ userId: user.id, tokenHash })
      const newPassword = 'newSecureP@ssw0rd'

      const app = createApp({
        endpoints: { resetPassword },
        tests: {
          auth: { userId: user.id },
          team: { teamId: team.id, memberRole: 'owner' }
        }
      })

      await request(app)
        .post('/resetPassword')
        .send({ token: plainTextToken, newPassword })

      const check = await pool
        .SELECT`password_hash`
        .FROM`"user"`
        .WHERE`id = ${user.id}`
        .first()

      expect(check.passwordHash).not.toBe(user.passwordHash)
    })
  })
})
