import { describe, expect, test } from 'vitest'
import { DatabaseFactory } from '../../libs'
import { createApp } from '../../setup'
import request from 'supertest'
import * as deleteComponents from './deleteComponents'

describe('deleteComponent', () => {
  test('delete components', async () => {
    const factory = new DatabaseFactory()
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id })
    const board = await factory.createBoard({ teamId: team.id })
    const component = await factory.createComponent({ boardId: board.id, teamId: team.id })

    const app = createApp({
      endpoints: { deleteComponents },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'owner' }
      }
    })

    await request(app)
      .post('/deleteComponents')
      .send({
        componentIds: [component.id],
        boardId: board.id
      })

    const check = await factory.pool
      .SELECT<{ id: string }>`id`
      .FROM`component`
      .WHERE`id = ${component.id}`
      .first()

    expect(check).toBeNull()
  })
})
