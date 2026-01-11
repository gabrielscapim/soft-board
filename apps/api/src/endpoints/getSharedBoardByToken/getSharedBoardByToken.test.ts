import { describe, expect, test } from 'vitest'
import { DatabaseFactory, getPool } from '../../libs'
import * as getSharedBoardByToken from './getSharedBoardByToken'
import { createApp } from '../../setup'
import request from 'supertest'

describe('getSharedBoardByToken', () => {
  test('return shared board', async () => {
    const pool = getPool()
    const factory = new DatabaseFactory({ pool })
    const user = await factory.createUser()
    const team = await factory.createTeam()
    const member = await factory.createMember({ userId: user.id, teamId: team.id, role: 'admin' })
    const board = await factory.createBoard({ teamId: team.id, step: 'end' })
    const boardShare = await factory.createBoardShare({ teamId: team.id, boardId: board.id })

    const app = createApp({
      endpoints: { getSharedBoardByToken },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: member.role }
      }
    })

    const result = await request(app)
      .post('/getSharedBoardByToken')
      .send({ token: boardShare.token })

    expect(result.status).toBe(200)
    expect(result.body.board.id).toBe(board.id)
  })
})
