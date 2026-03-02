import { describe, expect, test } from 'vitest'
import { createApp } from '../../setup'
import * as getBoards from './getBoards'
import { DatabaseFactory } from '../../libs'
import request from 'supertest'

describe('getBoards', () => {
  test('return boards', async () => {
    const factory = new DatabaseFactory()
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id })
    await factory.createBoard({ teamId: team.id })

    const app = createApp({
      endpoints: { getBoards },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'member' }
      }
    })

    const response = await request(app).post('/getBoards')

    expect(response.body.data.length).toBe(1)
  })
})
