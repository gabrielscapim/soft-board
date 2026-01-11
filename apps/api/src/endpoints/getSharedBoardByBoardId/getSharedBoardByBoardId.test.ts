import { describe, expect, test } from 'vitest'
import { DatabaseFactory, getPool } from '../../libs'
import * as getSharedBoardByBoardId from './getSharedBoardByBoardId'
import request from 'supertest'
import { createApp } from '../../setup'
import { FRONTEND_BASE_URL } from '../../constants'

describe('getSharedBoardByBoardId', () => {
  describe('when board share does not exist', () => {
    test('return link as null', async () => {
      const pool = getPool()
      const factory = new DatabaseFactory({ pool })
      const user = await factory.createUser()
      const team = await factory.createTeam()
      const member = await factory.createMember({ userId: user.id, teamId: team.id, role: 'admin' })
      const board = await factory.createBoard({ teamId: team.id, step: 'end' })

      const app = createApp({
        endpoints: { getSharedBoardByBoardId },
        tests: {
          auth: { userId: user.id },
          team: { teamId: team.id, memberRole: member.role }
        }
      })

      const result = await request(app)
        .post('/getSharedBoardByBoardId')
        .send({ boardId: board.id })

      expect(result.status).toBe(200)
      expect(result.body.link).toBeNull()
    })
  })

  describe('when board share exists', () => {
    test('return link', async () => {
      const pool = getPool()
      const factory = new DatabaseFactory({ pool })
      const user = await factory.createUser()
      const team = await factory.createTeam()
      const member = await factory.createMember({ userId: user.id, teamId: team.id, role: 'admin' })
      const board = await factory.createBoard({ teamId: team.id, step: 'end' })
      const boardShare = await factory.createBoardShare({ teamId: team.id, boardId: board.id })

      const app = createApp({
        endpoints: { getSharedBoardByBoardId },
        tests: {
          auth: { userId: user.id },
          team: { teamId: team.id, memberRole: member.role }
        }
      })

      const result = await request(app)
        .post('/getSharedBoardByBoardId')
        .send({ boardId: board.id })

      const expectedLink = new URL(`/share/${boardShare.token}`, FRONTEND_BASE_URL).toString()

      expect(result.status).toBe(200)
      expect(result.body.link).toBe(expectedLink)
    })
  })
})
