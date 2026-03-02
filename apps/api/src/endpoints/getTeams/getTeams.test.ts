import { describe, expect, test } from 'vitest'
import { DatabaseFactory } from '../../libs'
import * as getTeams from './getTeams'
import request from 'supertest'
import { createApp } from '../../setup'

describe('getTeams', () => {
  test('return teams', async () => {
    const factory = new DatabaseFactory()
    const user = await factory.createUser()
    const team1 = await factory.createTeam()
    const team2 = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team1.id })
    await factory.createMember({ userId: user.id, teamId: team2.id })

    const app = createApp({
      endpoints: { getTeams },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team1.id, memberRole: 'member' }
      }
    })

    const response = await request(app)
      .post('/getTeams')

    expect(response.body.data.length).toBe(2)
  })
})
