import { describe, expect, test } from 'vitest'
import request from 'supertest'
import { DatabaseFactory } from '../../libs'
import { createApp } from '../../setup'
import * as deleteBoard from './deleteBoard'

describe('deleteBoard', () => {
  test('delete board', async () => {
    const factory = new DatabaseFactory()
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id })
    const board = await factory.createBoard({ teamId: team.id, authorId: user.id })

    const app = createApp({
      endpoints: { deleteBoard },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'owner' }
      }
    })

    await request(app)
      .post('/deleteBoard')
      .send({ id: board.id })
      .expect(204)

    const check = await factory.pool
      .SELECT`id`
      .FROM`board`
      .WHERE`id = ${board.id}`
      .AND`team_id = ${team.id}`
      .first()

    expect(check).toBeNull()
  })
})
