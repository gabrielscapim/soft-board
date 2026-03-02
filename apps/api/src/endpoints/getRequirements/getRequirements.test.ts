import { describe, expect, test } from 'vitest'
import { DatabaseFactory } from '../../libs'
import * as getRequirements from './getRequirements'
import { createApp } from '../../setup'
import request from 'supertest'
import { randomUUID } from 'crypto'

describe('getRequirements', () => {
  test('return the board requirements', async () => {
    const factory = new DatabaseFactory()
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id, role: 'owner' })
    const board = await factory.createBoard({ teamId: team.id, authorId: user.id })
    const requirement1 = await factory.createRequirement({ teamId: team.id, boardId: board.id, authorId: user.id, title: randomUUID() })
    const requirement2 = await factory.createRequirement({ teamId: team.id, boardId: board.id, authorId: user.id, title: randomUUID() })

    const app = createApp({
      endpoints: { getRequirements },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'owner' }
      }
    })

    const response = await request(app)
      .post('/getRequirements')
      .send({ boardId: board.id })

    expect(response.status).toBe(200)
    expect(response.body.data).toHaveLength(2)
    expect(response.body.data[0].id).toBe(requirement1.id)
    expect(response.body.data[1].id).toBe(requirement2.id)
  })
})
