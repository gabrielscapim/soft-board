import { describe, expect, test } from 'vitest'
import { createApp } from '../../setup'
import * as getCurrentUserRole from './getCurrentUserRole'
import request from 'supertest'
import { DatabaseFactory } from '../../libs'

describe('getCurrentUserRole', () => {
  test('return the current user role', async () => {
    const factory = new DatabaseFactory()
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id, role: 'admin' })

    const app = createApp({
      endpoints: { getCurrentUserRole },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'owner' }
      }
    })

    const response = await request(app)
      .post('/getCurrentUserRole')
      .expect(200)

    expect(response.body.role).toBe('admin')
  })
})
