import { describe, test, expect } from 'vitest'
import { DatabaseFactory } from '../../libs'
import * as createRequirement from './createRequirement'
import { createApp } from '../../setup'
import request from 'supertest'
import { randomUUID } from 'crypto'

describe('createRequirement', () => {
  test('create a requirement', async () => {
    const factory = new DatabaseFactory()
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id, role: 'owner' })
    const board = await factory.createBoard({ teamId: team.id, authorId: user.id })
    const newRequirementTitle = randomUUID()

    const app = createApp({
      endpoints: { createRequirement },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'owner' }
      }
    })

    const response = await request(app)
      .post('/createRequirement')
      .send({ boardId: board.id, title: newRequirementTitle, description: null })

    const check = await factory.pool
      .SELECT`id`
      .FROM`requirement`
      .WHERE`id = ${response.body.id}`
      .find()

    expect(check.id).toBe(response.body.id)
  })
})
