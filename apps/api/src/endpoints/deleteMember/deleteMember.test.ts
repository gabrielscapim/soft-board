import { describe, expect, test } from 'vitest'
import { DatabaseFactory } from '../../libs'
import * as deleteMember from './deleteMember'
import { createApp } from '../../setup'
import request from 'supertest'

describe('deleteMembers', () => {
  describe('when the member is not the owner', () => {
    test('delete member', async () => {
      const factory = new DatabaseFactory()
      const clientUser = await factory.createUser()
      const user = await factory.createUser()
      const team = await factory.createTeam()
      await factory.createMember({ userId: clientUser.id, teamId: team.id })
      const member = await factory.createMember({ userId: user.id, teamId: team.id, role: 'member' })

      const app = createApp({
        endpoints: { deleteMember },
        tests: {
          auth: { userId: clientUser.id },
          team: { teamId: team.id, memberRole: 'owner' }
        }
      })

      await request(app)
        .post('/deleteMember')
        .send({ memberId: member.id })

      const check = await factory.pool
        .SELECT`id`
        .FROM`member`
        .WHERE`team_id = ${team.id}`
        .AND`id = ${member.id}`
        .list()

      expect(check.length).toBe(0)
    })
  })

  describe('when the member is the owner', () => {
    test('cannot delete owner', async () => {
      const factory = new DatabaseFactory()
      const clientUser = await factory.createUser()
      const user = await factory.createUser()
      const team = await factory.createTeam()
      await factory.createMember({ userId: clientUser.id, teamId: team.id, role: 'owner' })
      const member = await factory.createMember({ userId: user.id, teamId: team.id, role: 'owner' })

      const app = createApp({
        endpoints: { deleteMember },
        tests: {
          auth: { userId: clientUser.id },
          team: { teamId: team.id, memberRole: 'owner' }
        }
      })

      const response = await request(app)
        .post('/deleteMember')
        .send({ memberId: member.id })

      expect(response.status).toBe(400)
    })
  })
})
