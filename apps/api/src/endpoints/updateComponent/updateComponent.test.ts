import { describe, expect, test } from 'vitest'
import { DatabaseFactory, getPool } from '../../libs'
import { createApp } from '../../setup'
import * as updateComponent from './updateComponent'
import request from 'supertest'

describe('updateComponent', () => {
  test('update component', async () => {
    const pool = getPool()
    const factory = new DatabaseFactory({ pool })
    const user = await factory.createUser()
    const team = await factory.createTeam()
    await factory.createMember({ userId: user.id, teamId: team.id })
    const board = await factory.createBoard({ teamId: team.id })
    const connectionComponent = await factory.createComponent({ boardId: board.id, teamId: team.id })
    const component = await factory.createComponent({ boardId: board.id, teamId: team.id })
    const newName = 'Updated Component'
    const newConnectionId = connectionComponent.id

    const app = createApp({
      endpoints: { updateComponent },
      tests: {
        auth: { userId: user.id },
        team: { teamId: team.id, memberRole: 'member' }
      }
    })

    await request(app)
      .post('/updateComponent')
      .send({
        id: component.id,
        boardId: board.id,
        name: newName,
        connectionId: newConnectionId
      })

    const check = await pool
      .SELECT`name, connection_id`
      .FROM`component`
      .WHERE`id = ${component.id}`
      .find()

    expect(check.name).toBe(newName)
    expect(check.connectionId).toBe(newConnectionId)
  })
})
