import { describe, expect, test } from 'vitest'
import request from 'supertest'
import * as signUp from './signUp'
import { DatabaseFactory, getPool } from '../../libs'
import { createApp } from '../../setup'
import { asValue, createContainer } from 'awilix'
import { randomUUID } from 'crypto'

describe('signUp', () => {
  test('creates a sign-up form and sends an email', async () => {
    const pool = getPool()

    const container = createContainer().register({
      sendMail: asValue(async () => Promise.resolve())
    })
    const app = createApp({
      container,
      endpoints: { signUp }
    })

    const email = randomUUID() + '@example.com'
    await request(app)
      .post('/signUp')
      .send({
        name: 'Test User',
        email: email,
        password: 'password123'
      })

    const check = await pool
      .SELECT`id, email, expire_date`
      .FROM`sign_up_form`
      .WHERE`normalized_email = ${email.toUpperCase()}`
      .first()

    expect(check.email).toBe(email)
  })

  test('return token',  async () => {
    const container = createContainer().register({
      sendMail: asValue(async () => Promise.resolve())
    })
    const app = createApp({
      container,
      endpoints: { signUp }
    })

    const email = randomUUID() + '@example.com'
    const response = await request(app)
      .post('/signUp')
      .send({
        name: 'Test User',
        email: email,
        password: 'password123'
      })

    expect(response.status).toBe(200)
    expect(response.body.token).toBeDefined()
  })

  describe('when exist previous sign-up form for the same email', () => {
    test('invalidates the previous sign-up form', async () => {
      const pool = getPool()
      const factory = new DatabaseFactory({ pool })
      const signUpForm = await factory.createSignUpForm()

      const container = createContainer()
        .register({ sendMail: asValue(async () => Promise.resolve()) })
      const app = createApp({
        container,
        endpoints: { signUp }
      })

      await request(app)
        .post('/signUp')
        .send({
          name: 'Test User',
          email: signUpForm.email,
          password: 'password123'
        })

      const check = await pool
        .SELECT`expire_date`
        .FROM`sign_up_form`
        .WHERE`id = ${signUpForm.id}`
        .first()

      expect(new Date(check.expireDate).getTime()).toBeLessThan(new Date().getTime())
    })
  })
})
