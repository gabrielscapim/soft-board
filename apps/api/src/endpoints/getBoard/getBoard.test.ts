import { describe, expect, test } from 'vitest'
import { createApp } from '../../setup'
import * as getBoard from './getBoard'
import { DatabaseFactory, getPool } from '../../libs'
import request from 'supertest'

describe('getBoard', () => {
  describe('when board exists', () => {
    test('returns the board', async () => {
      const pool = getPool()
      const factory = new DatabaseFactory({ pool })
      const user = await factory.createUser()
      const team = await factory.createTeam()
      await factory.createMember({ userId: user.id, teamId: team.id })
      const board = await factory.createBoard({ teamId: team.id })

      const app = createApp({
        endpoints: { getBoard: getBoard },
        tests: {
          auth: { userId: user.id },
          team: { teamId: team.id, memberRole: 'member' }
        }
      })

      const response = await request(app)
        .post('/getBoard')
        .send({ boardId: board.id })

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        id: board.id,
        title: board.title,
        step: board.step,
        image: board.image,
        createDate: board.createDate.toISOString(),
        updateDate: board.updateDate.toISOString(),
        team: {
          id: team.id,
          slug: team.slug,
          name: team.name
        },
        components: []
      })
    })
  })
})
