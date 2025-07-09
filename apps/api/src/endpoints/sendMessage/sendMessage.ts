import { SendMessageCommand, SendMessageResult } from 'types/endpoints'
import { RequestHandler } from 'express'
import { getPool } from '../../libs'
import OpenAI, { OpenAIError } from 'openai'
import * as yup from 'yup'

type Handler = RequestHandler<unknown, SendMessageResult, SendMessageCommand>

type Deps = {
  openai: OpenAI
}

const schema = yup.object({
  content: yup.string().required('Message is required'),
  boardId: yup.string().required('Board ID is required')
})

export function handler ({ openai }: Deps): Handler {
  return async (req, res) => {
    const { content, boardId } = await schema.validate(req.body, { abortEarly: false })
    const teamId = req.team!.teamId
    const userId = req.auth!.userId

    const pool = getPool()

    const { response, error } = await completeMessage(openai, content)

    const result = await pool.transaction(async pool => {
      await pool
        .INSERT_INTO`message`
        .VALUES({
          teamId,
          boardId,
          authorId: userId,
          content: content,
          role: 'user'
        })

      const { rows: [message] } = await pool
        .INSERT_INTO`message`
        .VALUES({
          teamId,
          boardId: boardId,
          content: response,
          role: 'assistant',
          error
        })
        .RETURNING<{ id: string }>`id`

      return {
        id: message.id,
        content: response
      }
    })

    res.status(201).json(result)
  }
}

async function completeMessage (
  openai: OpenAI,
  content: string
): Promise<{ response: string | null, error?: { name: string, message: string, stack?: string } }> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.'
        },
        {
          role: 'user',
          content: content
        }
      ]
    })
    const response = completion.choices[0].message.content

    return {
      response
    }
  } catch (error) {
    const response = 'An error occurred while processing your message.'

    if (error instanceof OpenAIError) {
      return {
        response,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack
        }
      }
    }

    return {
      response
    }
  }
}
