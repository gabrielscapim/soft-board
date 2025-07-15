import { describe, expect, test } from 'vitest'
import { createApp } from '../../setup'
import * as updateRequirement from './updateRequirement'
import request from 'supertest'
import { DatabaseFactory, getPool } from '../../libs'
import { randomUUID } from 'crypto'

describe('updateRequirement', () => {
  test('update requirement', async () => {
    const pool = getPool()
    const factory = new DatabaseFactory({ pool })
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id, role: 'owner' })
    const board = await factory.createBoard({ teamId: team.id, authorId: user.id })
    const requirement = await factory.createRequirement({ teamId: team.id, boardId: board.id, authorId: user.id, title: randomUUID() })

    const app = createApp({
      endpoints: { updateRequirement },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'owner' }
      }
    })

    const newTitle = randomUUID()
    const newDescription = randomUUID()

    await request(app)
      .post('/updateRequirement')
      .send({ id: requirement.id, title: newTitle, description: newDescription, boardId: board.id })

    const check = await pool
      .SELECT`title, description`
      .FROM`requirement`
      .WHERE`id = ${requirement.id}`
      .AND`team_id = ${team.id}`
      .find()

    expect(check.title).toBe(newTitle)
    expect(check.description).toBe(newDescription)
  })
})
