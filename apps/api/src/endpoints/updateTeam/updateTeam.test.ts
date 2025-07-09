import { describe, expect, test } from 'vitest'
import { DatabaseFactory, getPool } from '../../libs'
import * as updateTeam from './updateTeam'
import { createApp } from '../../setup'
import request from 'supertest'
import { randomUUID } from 'crypto'

describe('updateTeam', () => {
  test('update team name', async () => {
    const pool = getPool()
    const factory = new DatabaseFactory({ pool })
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id })
    const newName = randomUUID()

    const app = createApp({
      endpoints: { updateTeam },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'owner' }
      }
    })

    await request(app)
      .post('/updateTeam')
      .send({ name: newName })

    const check = await pool
      .SELECT`name`
      .FROM`team`
      .WHERE`id = ${team.id}`
      .find()

    expect(check.name).toBe(newName)
  })
})
