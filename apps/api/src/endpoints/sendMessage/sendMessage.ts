import { SendMessageResultMessage, SendMessageCommand, SendMessageResult } from 'types/endpoints'
import { RequestHandler } from 'express'
import { getPool, logger } from '../../libs'
import OpenAI, { OpenAIError } from 'openai'
import * as yup from 'yup'
import { DatabasePool } from 'pg-script'
import { ChatCompletionMessageParam, ChatCompletionMessageToolCall } from 'openai/resources/index'
import { BoardDatabase, MessageDatabase } from 'types/database'
import {
  AgentContext,
  CaptureScreens,
  CreateRequirementTool,
  CreateWireflowTool,
  DeleteRequirementByIdTool,
  GetRequirementsTool,
  REQUIREMENTS_AGENT_PROMPT,
  REVIEW_AGENT_PROMPT,
  StartFlowAgent,
  Tool,
  UpdateRequirementByIdTool,
  WIREFLOWS_AGENT_PROMPT
} from './startflow-agent'

type Handler = RequestHandler<unknown, SendMessageResult, SendMessageCommand>

type MessageRow = Pick<MessageDatabase, 'role' | 'content' | 'toolCallId' | 'toolCalls'> & { userName: string | null }

type BoardRow = Pick<BoardDatabase, 'id' | 'step'>

type Deps = {
  openai: OpenAI
}

const schema = yup.object({
  content: yup.string().required('Message is required'),
  boardId: yup.string().required('Board ID is required')
})

const DEFAULT_ERROR_MESSAGE = 'An error occurred while processing your message.'

export function handler ({ openai }: Deps): Handler {
  return async (req, res) => {
    const { content, boardId } = await schema.validate(req.body, { abortEarly: false })
    const teamId = req.team!.teamId
    const userId = req.auth!.userId

    const pool = getPool()

    const team = await pool
      .SELECT<{ slug: string }>`slug`
      .FROM`team`
      .WHERE`id = ${teamId}`
      .find({ error: `Team with id ${teamId} not found` })

    const board = await pool
      .SELECT<BoardRow>`id, step`
      .FROM`board`
      .WHERE`id = ${boardId}`
      .AND`team_id = ${teamId}`
      .find({ error: `Board with id ${boardId} not found` })

    const history = await getHistory(pool, boardId)
    const tools = getTools(board, pool)
    const prompt = getPrompt(board)

    const context: AgentContext = {
      board: {
        id: boardId,
        step: board.step
      },
      team: {
        id: teamId,
        slug: team.slug
      },
      user: {
        id: userId
      }
    }

    const agent = new StartFlowAgent({
      context,
      openai,
      history,
      prompt,
      tools
    })

    const responseMessages: Array<ChatCompletionMessageParam & { executionTimeMs?: number }> = []
    let agentError: { name: string; message: string; stack?: string } | null = null

    try {
      responseMessages.push(...await agent.run(content))
    } catch (error) {
      if (error instanceof OpenAIError) {
        agentError = {
          name: error.name,
          message: error.message,
          stack: error.stack
        }
      }

      logger.error({ error }, 'Error while running StartFlowAgent')

      responseMessages.push({
        role: 'assistant',
        content: DEFAULT_ERROR_MESSAGE
      })
    }

    const result = await pool.transaction(async pool => {
      const result: SendMessageResultMessage[] = []

      await pool
        .INSERT_INTO`message`
        .VALUES({
          teamId,
          boardId,
          authorId: userId,
          content: content,
          role: 'user',
          sendDate: new Date()
        })

      for (const message of responseMessages) {
        /**
         * Add 2ms delay to ensure messages are in the correct order
         * TO-DO: Add "order" column to message table
         */
        await new Promise(resolve => setTimeout(resolve, 2))

        const isImage =
          message.role === 'user'
          && Array.isArray(message.content)
          && message.content.map(content => content.type === 'image_url')

        const { rows: [created] } = await pool
          .INSERT_INTO<{ id: string }>`message`
          .VALUES({
            teamId,
            boardId,
            content: message.content ?? 'No content',
            role: message.role,
            type: isImage ? 'image' : 'text',
            sendDate: new Date(),
            toolCalls: message.role === 'assistant' ? JSON.stringify(message.tool_calls) : null,
            toolCallId: message.role === 'tool' ? message.tool_call_id : null,
            error: agentError,
            executionTimeMs: message.executionTimeMs ? Math.round(message.executionTimeMs) : null
          })
          .RETURNING`id`

        const toolCalls = message.role === 'assistant'
          ? message.tool_calls?.map(toolCall => ({
            id: toolCall.id,
            type: toolCall.type,
            function: {
              name: toolCall.function.name,
              arguments: JSON.parse(toolCall.function.arguments)
            }
          }))
          : null

        result.push({
          id: created.id,
          role: message.role as SendMessageResultMessage['role'],
          content: typeof message.content === 'string' ? message.content : null,
          toolCalls: toolCalls ?? null
        })
      }

      return result
    })

    res.status(200).json({ messages: result })
  }
}

async function getHistory (
  pool: DatabasePool,
  boardId: string
): Promise<Array<ChatCompletionMessageParam>> {
  const messages = await pool
    .SELECT<MessageRow>`
      message.role,
      message.content,
      message.tool_call_id AS "toolCallId",
      message.tool_calls AS "toolCalls",
      "user".name as "userName"`
    .FROM`message`
    .LEFT_JOIN`"user" ON "user".id = message.author_id`
    .WHERE`board_id = ${boardId}`
    .AND`message.type = 'text'`
    .ORDER_BY`send_date ASC`
    .list()

  const history = messages.map<ChatCompletionMessageParam>(message => {
    if (message.role === 'user') {
      const result: ChatCompletionMessageParam = {
        role: 'user',
        content: message.content ?? '',
        name: message.userName ?? undefined
      }

      return result
    }

    if (message.role === 'assistant') {
      const result: ChatCompletionMessageParam = {
        role: 'assistant',
        content: message.content ?? '',
        tool_calls: (message.toolCalls as Array<ChatCompletionMessageToolCall>)?.map(toolCall => ({
          id: toolCall.id,
          type: 'function',
          function: {
            name: toolCall.function.name,
            arguments: JSON.stringify(toolCall.function.arguments)
          }
        }))
      }

      return result
    }

    if (message.role === 'tool') {
      const result: ChatCompletionMessageParam = {
        role: 'tool',
        content: message.content ?? '',
        tool_call_id: message.toolCallId!
      }

      return result
    }

    throw new Error(`Unknown message role: ${message.role}`)
  })

  return history
}

function getTools (
  board: BoardRow,
  pool: DatabasePool
): Tool[] {
  if (board.step === 'requirements') {
    return [
      new CreateRequirementTool({ pool }),
      new DeleteRequirementByIdTool({ pool }),
      new GetRequirementsTool({ pool }),
      new UpdateRequirementByIdTool({  pool })
    ]
  } else if (board.step === 'wireflows') {
    return [
      new CreateWireflowTool({ pool })
    ]
  } else if (board.step === 'review') {
    return [
      new CaptureScreens({ pool })
    ]
  }

  return []
}

function getPrompt (board: BoardRow): string {
  if (board.step === 'init') {
    return REQUIREMENTS_AGENT_PROMPT
  } else if (board.step === 'wireflows') {
    return WIREFLOWS_AGENT_PROMPT
  } else if (board.step === 'review') {
    return REVIEW_AGENT_PROMPT
  }

  return 'You are a helpful assistant.'
}
