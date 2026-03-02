import { describe, expect, test } from 'vitest'
import { DatabaseFactory } from '../../libs'
import { createApp } from '../../setup'
import * as shareBoard from './shareBoard'
import request from 'supertest'
import { FRONTEND_BASE_URL } from '../../constants'

describe('shareBoard', () => {
  describe('when board shared link already exists', () => {
    test('creates a new share link', async () => {
      const factory = new DatabaseFactory()
      const user = await factory.createUser()
      const team = await factory.createTeam()
      const member = await factory.createMember({ userId: user.id, teamId: team.id, role: 'admin' })
      const board = await factory.createBoard({ teamId: team.id })
      const boardShare = await factory.createBoardShare({ teamId: team.id, boardId: board.id })

      const app = createApp({
        endpoints: { shareBoard },
        tests: {
          auth: { userId: user.id },
          team: { teamId: team.id, memberRole: member.role }
        }
      })

      const result = await request(app)
        .post('/shareBoard')
        .send({ boardId: board.id })

      const expectedLink = new URL(`/share/${boardShare.token}`, FRONTEND_BASE_URL).toString()

      expect(result.body.link).toBe(expectedLink)
    })
  })

  describe('when board shared link does not exist', () => {
    test('creates a new share link', async () => {
      const factory = new DatabaseFactory()
      const user = await factory.createUser()
      const team = await factory.createTeam()
      const member = await factory.createMember({ userId: user.id, teamId: team.id, role: 'admin' })
      const board = await factory.createBoard({ teamId: team.id })

      const app = createApp({
        endpoints: { shareBoard },
        tests: {
          auth: { userId: user.id },
          team: { teamId: team.id, memberRole: member.role }
        }
      })

      const result = await request(app)
        .post('/shareBoard')
        .send({ boardId: board.id })

      const check = await factory.pool
        .SELECT`token`
        .FROM`board_share`
        .WHERE`board_id = ${board.id}`
        .find()

      const expectedLink = new URL(`/share/${check.token}`, FRONTEND_BASE_URL).toString()

      expect(result.body.link).toBe(expectedLink)
    })
  })
})
