import { SendMessageCommand } from 'types/endpoints'
import { RequestHandler, Response } from 'express'
import { getPool } from '../../libs'
import OpenAI from 'openai'
import * as yup from 'yup'

type Handler = RequestHandler<unknown, unknown, SendMessageCommand>

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

    const { response, error } = await completeMessageStream(openai, content, res)

    await pool.transaction(async pool => {
      await pool
        .UPDATE`board`
        .SET({ updateDate: new Date() })
        .WHERE`id = ${boardId}`

      await pool
        .INSERT_INTO`message`
        .VALUES({
          teamId,
          boardId,
          authorId: userId,
          content: content,
          role: 'user'
        })

      await pool
        .INSERT_INTO`message`
        .VALUES({
          teamId,
          boardId: boardId,
          content: response,
          role: 'assistant',
          error
        })
        .RETURNING<{ id: string }>`id`
    })

    res.end()
  }
}

async function completeMessageStream (
  openai: OpenAI,
  content: string,
  res: Response
): Promise<{
  response: string | null
  error?: { name: string; message: string; stack?: string }
}> {
  try {
    // Set headers for SSE (Server-Sent Events)
    res.status(200)
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders()

    // Create a stream with OpenAI's chat completion
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user',   content }
      ],
      stream: true
    })

    let response = ''

    // Iterate over the stream and send each chunk to the client
    for await (const chunk of stream) {
      const content = chunk.choices[0].delta.content

      if (content) {
        response += content
        res.write(content)
      }
    }

    return { response }
  } catch (error) {
    const fallback = 'An error occurred while processing your message.'

    res.write(fallback)

    if (error instanceof OpenAI.OpenAIError) {
      return {
        response: fallback,
        error: { name: error.name, message: error.message, stack: error.stack }
      }
    }

    return { response: fallback }
  }
}
