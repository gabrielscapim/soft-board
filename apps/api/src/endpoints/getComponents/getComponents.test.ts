import { describe, expect, test } from 'vitest'
import { DatabaseFactory, getPool } from '../../libs'
import { createApp } from '../../setup'
import * as getComponents from './getComponents'
import request from 'supertest'

describe('getComponents', () => {
  test('return components', async () => {
    const pool = getPool()
    const factory = new DatabaseFactory({ pool })
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id })
    const board = await factory.createBoard({ teamId: team.id })
    await factory.createComponent({ boardId: board.id, teamId: team.id })
    await factory.createComponent({ boardId: board.id, teamId: team.id })

    const app = createApp({
      endpoints: { getComponents },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'member' }
      }
    })

    const response = await request(app)
      .post('/getComponents')
      .send({ boardId: board.id })

    expect(response.body.data.length).toBe(2)
  })
})
