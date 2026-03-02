import { describe, expect, test } from 'vitest'
import request from 'supertest'
import { DatabaseFactory } from '../../libs'
import { createApp } from '../../setup'
import * as deleteRequirement from './deleteRequirement'

describe('deleteRequirement', () => {
  test('delete a board requirement', async () => {
    const factory = new DatabaseFactory()
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id })
    const board = await factory.createBoard({ teamId: team.id, authorId: user.id })
    const requirement = await factory.createRequirement({ boardId: board.id, teamId: team.id, authorId: user.id })

    const app = createApp({
      endpoints: { deleteRequirement },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'owner' }
      }
    })

    await request(app)
      .post('/deleteRequirement')
      .send({ id: requirement.id, boardId: board.id })

    const check = await factory.pool
      .SELECT`id`
      .FROM`requirement`
      .WHERE`id = ${requirement.id}`
      .AND`board_id = ${board.id}`
      .AND`team_id = ${team.id}`
      .first()

    expect(check).toBeNull()
  })
})
