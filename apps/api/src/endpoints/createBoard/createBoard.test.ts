import { describe, expect, test } from 'vitest'
import { DatabaseFactory } from '../../libs'
import * as createBoard from './createBoard'
import { createApp } from '../../setup'
import request from 'supertest'

describe('createBoard', () => {
  test('create a board', async () => {
    const factory = new DatabaseFactory()
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id })

    const app = createApp({
      endpoints: { createBoard },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'admin' }
      }
    })

    const response = await request(app).post('/createBoard')

    const check = await pool
      .SELECT`id`
      .FROM`board`
      .WHERE`team_id = ${team.id}`
      .AND`id = ${response.body.id}`
      .find()

    expect(check).toBeDefined()
  })
})
