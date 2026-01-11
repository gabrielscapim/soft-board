import { SendMessageResultMessage, SendMessageCommand, SendMessageResult } from 'types/endpoints'
import { RequestHandler } from 'express'
import { assertMemberPermission, getPool, logger } from '../../libs'
import { OpenAIError } from 'openai'
import * as yup from 'yup'
import { DatabasePool } from 'pg-script'
import { ChatCompletionMessageFunctionToolCall, ChatCompletionMessageParam } from 'openai/resources/index'
import { BoardDatabase, MessageDatabase } from 'types/database'
import { AgentContext, StartFlowAgent, Tool } from '../../startflow-agent'
import { REQUIREMENTS_AGENT_PROMPT, WIREFLOWS_AGENT_PROMPT, REVIEW_AGENT_PROMPT } from './prompts'
import {
  CreateRequirementTool,
  DeleteRequirementByIdTool,
  GetRequirementsTool,
  UpdateRequirementByIdTool,
  CreateWireflowTool,
  ReviewWireflowsTool
} from './tools'
import { GetApplicationDependencies, IPublisher } from '../../types'

type Handler = RequestHandler<unknown, SendMessageResult, SendMessageCommand>

type MessageRow = Pick<MessageDatabase, 'id' | 'role' | 'content' | 'toolCallId' | 'toolCalls'> & { userName: string | null }

type BoardRow = Pick<BoardDatabase, 'id' | 'step'>

const schema = yup.object({
  content: yup.string().required('Message is required'),
  boardId: yup.string().required('Board ID is required')
})

const DEFAULT_ERROR_MESSAGE = 'An error occurred while processing your message.'

export function handler (getDeps: GetApplicationDependencies): Handler {
  return async (req, res) => {
    const { content, boardId } = await schema.validate(req.body, { abortEarly: false })
    const { openai, publishers } = getDeps()
    const teamId = req.team!.teamId
    const userId = req.auth!.userId

    assertMemberPermission(req.team!.memberRole, ['admin', 'owner'], 'Only team admins and owners can send messages')

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

    const history = await pool
      .SELECT<MessageRow>`
        message.id,
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

    const tools = getTools(board, pool, publishers)
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
      tools,
      model: 'gpt-4o'
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
          ? (message.tool_calls as ChatCompletionMessageFunctionToolCall[] | undefined)?.map(toolCall => ({
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

function getTools (
  board: BoardRow,
  pool: DatabasePool,
  publishers: Record<string, IPublisher<any>>
): Tool[] {
  if (board.step === 'requirements') {
    return [
      new CreateRequirementTool({ pool, publishers }),
      new DeleteRequirementByIdTool({ pool, publishers }),
      new GetRequirementsTool({ pool, publishers }),
      new UpdateRequirementByIdTool({ pool, publishers })
    ]
  } else if (board.step === 'wireflows') {
    return [
      new CreateWireflowTool({ pool, publishers })
    ]
  } else if (board.step === 'review') {
    return [
      new ReviewWireflowsTool({ pool, publishers })
    ]
  }

  return []
}

function getPrompt (board: BoardRow): string {
  if (board.step === 'requirements') {
    return REQUIREMENTS_AGENT_PROMPT
  } else if (board.step === 'wireflows') {
    return WIREFLOWS_AGENT_PROMPT
  } else if (board.step === 'review') {
    return REVIEW_AGENT_PROMPT
  }

  return 'You are a helpful assistant.'
}
