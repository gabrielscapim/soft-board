import { describe, expect, test } from 'vitest'
import { getPool, DatabaseFactory } from '../../libs'
import { createApp } from '../../setup'
import request from 'supertest'
import * as addGenerationToBoard from './addGenerationToBoard'

describe('addGenerationToBoard', () => {
  test('add generation components to board', async () => {
    const pool = getPool()
    const factory = new DatabaseFactory({ pool })
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id })
    const board = await factory.createBoard({ teamId: team.id })
    const generation = await factory.createBoardGeneration({ boardId: board.id, teamId: team.id })
    const promises = new Array(3).fill(0).map(async () => {
      await factory.createComponent({
        boardId: board.id,
        teamId: team.id,
        boardGenerationId: generation.id
      })
    })
    await Promise.all(promises)

    const app = createApp({
      endpoints: { addGenerationToBoard },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'admin' }
      }
    })

    await request(app)
      .post('/addGenerationToBoard')
      .send({
        boardId: board.id,
        boardGenerationId: generation.id
      })

    const check = await pool
      .SELECT`id`
      .FROM`component`
      .WHERE`board_id = ${board.id}`
      .AND`board_generation_id IS NULL`
      .list()

    expect(check.length).toBe(3)
  })
})
