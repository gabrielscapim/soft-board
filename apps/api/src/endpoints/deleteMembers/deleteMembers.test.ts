import { describe, expect, test } from 'vitest'
import { DatabaseFactory, getPool } from '../../libs'
import * as deleteMembers from './deleteMembers'
import { createApp } from '../../setup'
import request from 'supertest'

describe('deleteMembers', () => {
  test('delete members', async () => {
    const pool = getPool()
    const factory = new DatabaseFactory({ pool })
    const clientUser = await factory.createUser()
    const user1 = await factory.createUser()
    const user2 = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: clientUser.id, teamId: team.id })
    const member1 = await factory.createMember({ userId: user1.id, teamId: team.id })
    const member2 = await factory.createMember({ userId: user2.id, teamId: team.id })

    const app = createApp({
      endpoints: { deleteMembers },
      tests: {
        auth: { userId: clientUser.id },
        team: { teamId: team.id }
      }
    })

    await request(app)
      .post('/deleteMembers')
      .send({ memberIds: [member1.id, member2.id] })

    const check = await pool
      .SELECT`id`
      .FROM`member`
      .WHERE`team_id = ${team.id}`
      .AND`id = ANY(${[member1.id, member2.id]})`
      .list()

    expect(check.length).toBe(0)
  })
})
