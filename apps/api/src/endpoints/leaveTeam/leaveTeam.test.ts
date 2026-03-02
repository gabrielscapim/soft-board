import { describe, expect, test } from 'vitest'
import { DatabaseFactory } from '../../libs'
import * as leaveTeam from './leaveTeam'
import { createApp } from '../../setup'
import request from 'supertest'

describe('leaveTeam', () => {
  describe('when you are not the owner', () => {
    test('leave team', async () => {
      const factory = new DatabaseFactory()
      const user = await factory.createUser()
      const team = await factory.createTeam()
      const member = await factory.createMember({ userId: user.id, teamId: team.id, role: 'member' })

      const app = createApp({
        endpoints: { leaveTeam },
        tests: {
          auth: { userId: user.id },
          team: { teamId: team.id, memberRole: member.role }
        }
      })

      await request(app).post('/leaveTeam')

      const check = await factory.pool
        .SELECT`id`
        .FROM`member`
        .WHERE`team_id = ${team.id}`
        .AND`user_id = ${user.id}`
        .first()

      expect(check).toBeNull()
    })
  })

  describe('when you are the owner', () => {
    test('cannot leave team', async () => {
      const factory = new DatabaseFactory()
      const user = await factory.createUser()
      const team = await factory.createTeam()
      await factory.createMember({ userId: user.id, teamId: team.id, role: 'owner' })

      const app = createApp({
        endpoints: { leaveTeam },
        tests: {
          auth: { userId: user.id },
          team: { teamId: team.id, memberRole: 'owner' }
        }
      })

      const response = await request(app).post('/leaveTeam')

      expect(response.status).toBe(400)
    })
  })
})
