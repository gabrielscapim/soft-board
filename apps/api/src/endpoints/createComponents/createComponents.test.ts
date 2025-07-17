import { describe, expect, test } from 'vitest'
import { getPool, DatabaseFactory } from '../../libs'
import { createApp } from '../../setup'
import * as createComponents from './createComponents'
import request from 'supertest'

describe('createComponent', () => {
  test('create a component', async () => {
    const pool = getPool()
    const factory = new DatabaseFactory({ pool })
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id })
    const board = await factory.createBoard({ teamId: team.id })

    const app = createApp({
      endpoints: { createComponents },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'admin' }
      }
    })

    await request(app)
      .post('/createComponents')
      .send({
        boardId: board.id,
        components: [{
          name: 'Test Component',
          type: 'button',
          properties: { label: 'Click me' }
        }]
      })

    const check = await pool
      .SELECT`id`
      .FROM`component`
      .WHERE`board_id = ${board.id}`
      .list()

    expect(check).toHaveLength(1)
  })
})
