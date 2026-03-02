import { describe, expect, test } from 'vitest'
import { DatabaseFactory } from '../../libs'
import { createApp } from '../../setup'
import * as getMembers from './getMembers'
import request from 'supertest'

describe('getMembers', () => {
  test('return members', async () => {
    const factory = new DatabaseFactory()
    const user1 = await factory.createUser()
    const user2 = await factory.createUser()
    const user3 = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user1.id, teamId: team.id })
    await factory.createMember({ userId: user2.id, teamId: team.id })
    await factory.createMember({ userId: user3.id, teamId: team.id })

    const app = createApp({
      endpoints: { getMembers },
      tests: {
        auth: { userId: user1.id },
        team: { teamId: team.id, memberRole: 'admin' }
      }
    })

    const response = await request(app).post('/getMembers')

    expect(response.body.data.length).toBe(3)
  })
})
