import { describe, expect, test } from 'vitest'
import { DatabaseFactory, getPool } from '../../libs'
import { createApp } from '../../setup'
import * as signIn from './signIn'
import request from 'supertest'
import * as bcrypt from 'bcrypt'
import { PASSWORD_SALT_ROUNDS } from '../../constants'

describe('signIn', () => {
  describe('when user is not found or credentials are invalid', () => {
    test('throws Unauthorized error', async () => {
      const app = createApp({ endpoints: { signIn } })

      const response = await request(app)
        .post('/signIn')
        .send({
          email: 'user@email.com',
          password: 'password123'
        })

      expect(response.status).toBe(401)
    })
  })

  describe('when credentials are valid', () => {
    test('returns user data and sets authentication cookie', async () => {
      const app = createApp({ endpoints: { signIn } })
      const pool = getPool()
      const factory = new DatabaseFactory({ pool })
      const password = 'password123'
      const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS)
      const user = await factory.createUser({ passwordHash })

      const response = await request(app)
        .post('/signIn')
        .send({
          email: user.email,
          password
        })

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        userId: user.id,
        name: user.name
      })
      expect(response.headers['set-cookie']).toBeDefined()
    })
  })
})
