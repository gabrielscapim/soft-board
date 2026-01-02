import { describe, expect, test, vi } from 'vitest'
import { createApp } from '../../setup'
import * as signOut from './signOut'
import request from 'supertest'
import { mock } from 'vitest-mock-extended'
import { IPublisher } from '../../types'
import { UserSignedOutEvent } from 'event-types'
import { asValue, createContainer } from 'awilix'

describe('signOut', () => {
  test('clears the session cookie', async () => {
    const userSignedOut = mock<IPublisher<UserSignedOutEvent>>({
      publish: vi.fn()
    })
    const container = createContainer()
      .register({
        publishers: asValue({ userSignedOut })
      })
    const app = createApp({
      container,
      endpoints: { signOut }
    })

    const response = await request(app)
      .post('/signOut')
      .send()

    expect(response.status).toBe(204)
    expect(response.headers['set-cookie']).toBeDefined()
  })
})
