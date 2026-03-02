import { describe, expect, test } from 'vitest'
import { DatabaseFactory, getPool } from '../../libs'
import { createApp } from '../../setup'
import * as verifySignUp from './verifySignUp'
import request from 'supertest'
import { createHash } from 'crypto'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../constants'
import { nanoid } from 'nanoid'

describe('verifySignUp', () => {
  describe('when code is valid', () => {
    test('creates a user', async () => {
      const pool = getPool()
      const factory = new DatabaseFactory({ pool })
      const code = nanoid(6)
      const codeHash = createHash('sha256').update(code).digest('hex')
      const signUpForm = await factory.createSignUpForm({ codeHash })
      const token = jwt.sign({ signUpFormId: signUpForm.id }, JWT_SECRET)

      const app = createApp({
        endpoints: {
          verifySignUp
        }
      })

      // adiciona o token no header da requisição soft-board-sign-up-form
      await request(app)
        .post('/verifySignUp')
        .set('soft-board-sign-up-form', token)
        .send({
          code
        })

      const checkUser = await pool
        .SELECT`id`
        .FROM`"user"`
        .WHERE`normalized_email = ${signUpForm.normalizedEmail}`
        .first()

      expect(checkUser).toBeDefined()
    })
  })
})
