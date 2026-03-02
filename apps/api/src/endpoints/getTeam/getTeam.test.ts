import { describe, expect, test } from 'vitest'
import { DatabaseFactory } from '../../libs'
import * as getTeam from './getTeam'
import { createApp } from '../../setup'
import request from 'supertest'

describe('getTeam', () => {
  test('return team', async () => {
    const factory = new DatabaseFactory()
    const user = await factory.createUser()
    const team = await factory.createTeam()

    const app = createApp({
      endpoints: { getTeam },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'admin' }
      }
    })

    const response = await request(app)
      .post('/getTeam')
      .expect(200)

    expect(response.body).toEqual({
      id: team.id,
      name: team.name,
      slug: team.slug,
      logoUrl: null,
      createDate: team.createDate.toISOString(),
      updateDate: team.updateDate.toISOString()
    })
  })
})
