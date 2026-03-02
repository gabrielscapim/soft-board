import { describe, expect, test } from 'vitest'
import { DatabaseFactory } from '../../libs'
import { createApp } from '../../setup'
import * as updateBoard from './updateBoard'
import request from 'supertest'

describe('updateBoard', () => {
  test('update board title', async () => {
    const factory = new DatabaseFactory()
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id })
    const board = await factory.createBoard({ teamId: team.id, authorId: user.id })
    const newTitle = 'Updated Board Title'

    const app = createApp({
      endpoints: { updateBoard },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'owner' }
      }
    })

    await request(app)
      .post('/updateBoard')
      .send({
        id: board.id,
        title: newTitle
      })

    const check = await factory.pool
      .SELECT`title`
      .FROM`board`
      .WHERE`id = ${board.id}`
      .AND`team_id = ${team.id}`
      .find()

    expect(check.title).toBe(newTitle)
  })
})
