import { describe, expect, test } from 'vitest'
import { getPool } from '../../libs'
import { DatabaseFactory } from '../../libs/database-factory'
import { createApp } from '../../setup'
import * as getMessages from './getMessages'
import request from 'supertest'

describe('getMessages', () => {
  test('return board messages', async () => {
    const pool = getPool()
    const factory = new DatabaseFactory({ pool })
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id })
    const board = await factory.createBoard({ teamId: team.id })
    await factory.createMessage({ boardId: board.id, teamId: team.id, authorId: user.id, content: 'Hello World', role: 'user' })
    await factory.createMessage({ boardId: board.id, teamId: team.id, authorId: user.id, content: 'Hello again', role: 'user' })

    const app = createApp({
      endpoints: { getMessages },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'member' }
      }
    })

    const response = await request(app)
      .post('/getMessages')
      .send({ boardId: board.id })

    console.log(response.body)

    expect(response.body.data.length).toBe(2)
  })
})
