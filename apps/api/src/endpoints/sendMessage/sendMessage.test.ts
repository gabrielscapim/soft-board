import { describe, expect, test } from 'vitest'
import { DatabaseFactory, getPool } from '../../libs'
import { createApp } from '../../setup'
import OpenAI from 'openai'
import request from 'supertest'
import * as sendMessage from './sendMessage'
import { mockDeep } from 'vitest-mock-extended'

describe('sendMessage', () => {
  describe('when completion is successful', () => {
    test('return assistant message', async () => {
      const pool = getPool()
      const factory = new DatabaseFactory({ pool })
      const user = await factory.createUser()
      const team = await factory.createTeam()
      const board = await factory.createBoard({ teamId: team.id })
      const member = await factory.createMember({ userId: user.id, teamId: team.id, role: 'member' })

      // Mock OpenAI client
      const openai = mockDeep<OpenAI>()
      openai.chat.completions.create.mockResolvedValue({
        choices: [{
          message: {
            content: 'This is a response from the assistant.'
          }
        }]
      } as any)

      const app = createApp({
        endpoints: { sendMessage },
        openai,
        tests: {
          auth: { userId: user.id },
          team: { teamId: team.id, memberRole: member.role }
        }
      })

      const response = await request(app)
        .post('/sendMessage')
        .send({
          content: 'Hello, assistant!',
          boardId: board.id
        })

      expect(response.body.content).toBe('This is a response from the assistant.')
    })
  })

  describe('when completion fails', () => {
    test('returns error message', async () => {
      const pool = getPool()
      const factory = new DatabaseFactory({ pool })
      const user = await factory.createUser()
      const team = await factory.createTeam()
      const board = await factory.createBoard({ teamId: team.id })
      const member = await factory.createMember({ userId: user.id, teamId: team.id, role: 'member' })

      // Mock OpenAI client to throw an error
      const openai = mockDeep<OpenAI>()
      openai.chat.completions.create.mockRejectedValue(new OpenAI.OpenAIError('An error occurred'))

      const app = createApp({
        endpoints: { sendMessage },
        openai,
        tests: {
          auth: { userId: user.id },
          team: { teamId: team.id, memberRole: member.role }
        }
      })

      const response = await request(app)
        .post('/sendMessage')
        .send({
          content: 'Hello, assistant!',
          boardId: board.id
        })

      expect(response.body.content).toBe('An error occurred while processing your message.')
    })

    test('save error in the database', async () => {
      const pool = getPool()
      const factory = new DatabaseFactory({ pool })
      const user = await factory.createUser()
      const team = await factory.createTeam()
      const board = await factory.createBoard({ teamId: team.id })
      const member = await factory.createMember({ userId: user.id, teamId: team.id, role: 'member' })

      // Mock OpenAI client to throw an error
      const openai = mockDeep<OpenAI>()
      openai.chat.completions.create.mockRejectedValue(new OpenAI.OpenAIError('An error occurred'))

      const app = createApp({
        endpoints: { sendMessage },
        openai,
        tests: {
          auth: { userId: user.id },
          team: { teamId: team.id, memberRole: member.role }
        }
      })

      const response = await request(app)
        .post('/sendMessage')
        .send({
          content: 'Hello, assistant!',
          boardId: board.id
        })

      const check = await pool
        .SELECT`error`
        .FROM`message`
        .WHERE`id = ${response.body.id}`
        .find()

      expect(check.error).toBeDefined()
    })
  })
})
