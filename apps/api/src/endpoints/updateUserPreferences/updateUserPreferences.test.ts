import { describe, expect, test } from 'vitest'
import * as updateUserPreferences from './updateUserPreferences'
import { createApp } from '../../setup'
import request from 'supertest'
import { DatabaseFactory, getPool } from '../../libs'

describe('updateUserPreferences', () => {
  test('update user preferences', async () => {
    const pool = getPool()
    const factory = new DatabaseFactory({ pool })
    const user = await factory.createUser()
    await factory.createUserPreferences({ userId: user.id })

    const app = createApp({
      endpoints: { updateUserPreferences },
      tests: {
        auth: { userId: user.id }
      }
    })

    await request(app)
      .post('/updateUserPreferences')
      .send({ language: 'fr' })
      .expect(204)

    const check = await pool
      .SELECT`language`
      .FROM`user_preferences`
      .WHERE`user_id = ${user.id}`
      .find()

    expect(check.language).toBe('fr')
  })
})
