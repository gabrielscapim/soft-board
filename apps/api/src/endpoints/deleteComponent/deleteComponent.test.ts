import { describe, expect, test } from 'vitest'
import { DatabaseFactory, getPool } from '../../libs'
import { createApp } from '../../setup'
import request from 'supertest'
import * as deleteComponent from './deleteComponent'

describe('deleteComponent', () => {
  test('set deleted to true', async () => {
    const pool = getPool()
    const factory = new DatabaseFactory({ pool })
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id })
    const board = await factory.createBoard({ teamId: team.id })
    const component = await factory.createComponent({ boardId: board.id, teamId: team.id })

    const app = createApp({
      endpoints: { deleteComponent },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'member' }
      }
    })

    await request(app)
      .post('/deleteComponent')
      .send({
        id: component.id,
        boardId: board.id
      })

    const check = await pool
      .SELECT`deleted`
      .FROM`component`
      .WHERE`id = ${component.id}`
      .find()

    expect(check.deleted).toBe(true)
  })
})
