import { describe, expect, test } from 'vitest'
import { DatabaseFactory } from '../../libs'
import * as createMember from './createMember'
import { createApp } from '../../setup'
import request from 'supertest'

describe('createMember', () => {
  describe('when member already exists', () => {
    test('throws Conflict error', async () => {
      const factory = new DatabaseFactory()
      const clientUser = await factory.createUser()
      const newMemberUser = await factory.createUser()
      const team = await factory.createTeam()
      await factory.createMember({ userId: clientUser.id, teamId: team.id })
      await factory.createMember({ userId: newMemberUser.id, teamId: team.id })

      const app = createApp({
        endpoints: { createMember },
        tests: {
          auth: { userId: clientUser.id },
          team: { teamId: team.id, memberRole: 'owner' }
        }
      })

      const response = await request(app)
        .post('/createMember')
        .send({ email: newMemberUser.email, role: 'member' })

      expect(response.status).toBe(409)
    })
  })

  describe('when member does not exist', () => {
    test('create member', async () => {
      const factory = new DatabaseFactory()
      const clientUser = await factory.createUser()
      const newMemberUser = await factory.createUser()
      const team = await factory.createTeam()
      await factory.createMember({ userId: clientUser.id, teamId: team.id })

      const app = createApp({
        endpoints: { createMember },
        tests: {
          auth: { userId: clientUser.id },
          team: { teamId: team.id, memberRole: 'owner' }
        }
      })

      const response = await request(app)
        .post('/createMember')
        .send({ email: newMemberUser.email, role: 'member' })

      const check = await factory.pool
        .SELECT`id`
        .FROM`member`
        .WHERE`user_id = ${newMemberUser.id}`
        .AND`team_id = ${team.id}`
        .find()

      expect(response.body.id).toBe(check.id)
    })
  })
})
