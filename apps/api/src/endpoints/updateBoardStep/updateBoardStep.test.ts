import { describe, expect, test } from 'vitest'
import { DatabaseFactory } from '../../libs'
import { createApp } from '../../setup'
import * as updateBoardStep from './updateBoardStep'
import request from 'supertest'

describe('updateBoardStep', () => {
  test('update board step', async () => {
    const factory = new DatabaseFactory()
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id })
    const board = await factory.createBoard({ teamId: team.id, authorId: user.id })

    const app = createApp({
      endpoints: { updateBoardStep },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'owner' }
      }
    })

    await request(app)
      .post('/updateBoardStep')
      .send({
        id: board.id,
        step: 'next'
      })

    const check = await factory.pool
      .SELECT`step`
      .FROM`board`
      .WHERE`id = ${board.id}`
      .AND`team_id = ${team.id}`
      .find()

    expect(check.step).toBe('requirements')
  })
})
