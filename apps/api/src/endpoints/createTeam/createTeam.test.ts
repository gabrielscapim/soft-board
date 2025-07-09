import { describe, expect, test } from 'vitest'
import { DatabaseFactory, getPool } from '../../libs'
import * as createTeam from './createTeam'
import { createApp } from '../../setup'
import request from 'supertest'

describe('createTeam', () => {
  test('create a team', async () => {
    const pool = getPool()
    const factory = new DatabaseFactory({ pool })
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id })

    const app = createApp({
      endpoints: { createTeam },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id }
      }
    })

    const response = await request(app)
      .post('/createTeam')
      .send({ name: 'New Team' })

    const check = await pool
      .SELECT`id, slug`
      .FROM`team`
      .WHERE`slug = ${'new-team'}`
      .find()

    expect(check.id).toBe(response.body.id)
  })
})
