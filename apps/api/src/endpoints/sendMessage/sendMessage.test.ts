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
        [Symbol.asyncIterator]: async function* () {
          yield { choices: [{ delta: { content: 'This ' } }] }
          yield { choices: [{ delta: { content: 'is ' } }] }
          yield { choices: [{ delta: { content: 'a ' } }] }
          yield { choices: [{ delta: { content: 'response.' } }] }
        }
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

      expect(response.text).toBe('This is a response.')
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

      expect(response.text).toBe('An error occurred while processing your message.')
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

      await request(app)
        .post('/sendMessage')
        .send({
          content: 'Hello, assistant!',
          boardId: board.id
        })

      const check = await pool
        .SELECT`error`
        .FROM`message`
        .WHERE`board_id = ${board.id}`
        .AND`role = 'assistant'`
        .first()

      expect(check.error).toBeDefined()
    })
  })
})
