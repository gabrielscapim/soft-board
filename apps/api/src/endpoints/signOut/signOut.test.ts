import { describe, expect, test } from 'vitest'
import { createApp } from '../../setup'
import * as signOut from './signOut'
import request from 'supertest'

describe('signOut', () => {
  test('clears the session cookie', async () => {
    const app = createApp({ endpoints: { signOut }})

    const response = await request(app)
      .post('/signOut')
      .send()

    expect(response.status).toBe(204)
    expect(response.headers['set-cookie']).toBeDefined()
  })
})
