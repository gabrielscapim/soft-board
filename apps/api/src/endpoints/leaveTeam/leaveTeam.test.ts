import { describe, expect, test } from 'vitest'
import { getPool, DatabaseFactory } from '../../libs'
import * as leaveTeam from './leaveTeam'
import { createApp } from '../../setup'
import request from 'supertest'

describe('leaveTeam', () => {
  test('leave team', async () => {
    const pool = getPool()
    const factory = new DatabaseFactory({ pool })
    const user = await factory.createUser()
    const team = await factory.createTeam()
    const member = await factory.createMember({ userId: user.id, teamId: team.id })

    const app = createApp({
      endpoints: { leaveTeam },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: member.role }
      }
    })

    await request(app).post('/leaveTeam')

    const check = await pool
      .SELECT`id`
      .FROM`member`
      .WHERE`team_id = ${team.id}`
      .AND`user_id = ${user.id}`
      .first()

    expect(check).toBeNull()
  })
})
