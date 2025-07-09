import { describe, expect, test } from 'vitest'
import { getPool, DatabaseFactory } from '../../libs'
import * as getTeam from './getTeam'
import { createApp } from '../../setup'
import request from 'supertest'

describe('getTeam', () => {
  test('return team', async () => {
    const pool = getPool()
    const factory = new DatabaseFactory({ pool })
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
      createDate: team.createDate.toISOString(),
      updateDate: team.updateDate.toISOString()
    })
  })
})
