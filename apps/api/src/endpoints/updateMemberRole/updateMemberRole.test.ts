import { describe, expect, test } from 'vitest'
import { DatabaseFactory } from '../../libs'
import { createApp } from '../../setup'
import * as updateMemberRole from './updateMemberRole'
import request from 'supertest'

describe('updateMemberRole', () => {
  test('update member role', async () => {
    const factory = new DatabaseFactory()
    const clientUser = await factory.createUser()
    const userToUpdate = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: clientUser.id, teamId: team.id })
    const memberToUpdate = await factory.createMember({ userId: userToUpdate.id, teamId: team.id, role: 'member' })
    const newRole = 'admin'

    const app = createApp({
      endpoints: { updateMemberRole },
      tests: {
        auth: { userId: clientUser.id },
        team: { teamId: team.id, memberRole: 'owner' }
      }
    })

    await request(app)
      .post('/updateMemberRole')
      .send({
        memberId: memberToUpdate.id,
        role: newRole
      })

    const check = await factory.pool
      .SELECT`role`
      .FROM`member`
      .WHERE`id = ${memberToUpdate.id}`
      .AND`team_id = ${team.id}`
      .find()

    expect(check.role).toBe(newRole)
  })
})
