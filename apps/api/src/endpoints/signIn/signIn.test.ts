import { describe, expect, test, vi } from 'vitest'
import { DatabaseFactory, getPool } from '../../libs'
import { createApp } from '../../setup'
import * as signIn from './signIn'
import request from 'supertest'
import * as bcrypt from 'bcrypt'
import { mock } from 'vitest-mock-extended'
import { PASSWORD_SALT_ROUNDS } from '../../constants'
import { IPublisher } from '../../types'
import { UserSignedInEvent } from 'event-types'
import { asValue, createContainer } from 'awilix'

describe('signIn', () => {
  describe('when user is not found or credentials are invalid', () => {
    test('throws Unauthorized error', async () => {
      const userSignedIn = mock<IPublisher<UserSignedInEvent>>({
        publish: vi.fn()
      })
      const container = createContainer()
        .register({
          publishers: asValue({ userSignedIn })
        })
      const app = createApp({
        container,
        endpoints: { signIn }
      })

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
      const userSignedIn = mock<IPublisher<UserSignedInEvent>>({
        publish: vi.fn()
      })
      const container = createContainer()
        .register({
          publishers: asValue({ userSignedIn })
        })
      const app = createApp({
        container,
        endpoints: { signIn }
      })
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
      expect(response.body).toBeDefined()
      expect(response.headers['set-cookie']).toBeDefined()
    })
  })
})
