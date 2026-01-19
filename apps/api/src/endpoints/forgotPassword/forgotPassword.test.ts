import { describe, expect, test } from 'vitest'
import { getPool } from '../../libs'
import { DatabaseFactory } from '../../libs'
import { createApp } from '../../setup'
import * as forgotPassword from './forgotPassword'
import request from 'supertest'
import { asValue, createContainer } from 'awilix'

describe('forgotPassword', () => {
  describe('when password reset token already exists', () => {
    test('invalidates previous tokens before creating a new one', async () => {
      const pool = getPool()
      const factory = new DatabaseFactory({ pool })
      const user = await factory.createUser()
      const team = await factory.createTeam()
      await factory.createMember({ userId: user.id, teamId: team.id, role: 'owner' })
      const currentPasswordResetToken = await factory.createPasswordResetToken({ userId: user.id })

      const container = createContainer().register({ sendMail: asValue(async () => Promise.resolve()) })
      const app = createApp({
        endpoints: { forgotPassword },
        container,
        tests: {
          auth: { userId: user.id },
          team: { teamId: team.id, memberRole: 'owner' }
        }
      })

      await request(app)
        .post('/forgotPassword')
        .send({ email: user.email })

      const check = await pool
        .SELECT`id, expire_date`
        .FROM`password_reset_token`
        .WHERE`user_id = ${user.id}`
        .AND`id = ${currentPasswordResetToken.id}`
        .first()

      const isExpired = check.expireDate < new Date()

      expect(isExpired).toBe(true)
    })

    test('creates a new password reset token', async () => {
      const pool = getPool()
      const factory = new DatabaseFactory({ pool })
      const user = await factory.createUser()
      const team = await factory.createTeam()
      await factory.createMember({ userId: user.id, teamId: team.id, role: 'owner' })
      await factory.createPasswordResetToken({ userId: user.id })

      const container = createContainer().register({ sendMail: asValue(async () => Promise.resolve()) })
      const app = createApp({
        endpoints: { forgotPassword },
        container,
        tests: {
          auth: { userId: user.id },
          team: { teamId: team.id, memberRole: 'owner' }
        }
      })

      await request(app)
        .post('/forgotPassword')
        .send({ email: user.email })

      const check = await pool
        .SELECT`id`
        .FROM`password_reset_token`
        .WHERE`user_id = ${user.id}`

      expect(check.rowCount).toBe(2)
    })
  })
})
