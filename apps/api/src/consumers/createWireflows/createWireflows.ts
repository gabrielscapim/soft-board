import { AgentCalledFunctionEvent } from 'event-types'
import OpenAI from 'openai'
import { getPool, logger } from '../../libs'
import { MessageDatabase, RequirementDatabase } from 'types/database'
import { AgentContext } from '../../startflow-agent'
import { runSummaryAgent } from './methods/runSummaryAgent'
import { runWireflowsAgent } from './methods'

export const exchange = 'agentCalledFunction'

export const key = 'createWireflows'

type Deps = {
  openai: OpenAI
}

export function consumer (deps: Deps) {
  return async (event: AgentCalledFunctionEvent) => {
    const { board, team, user } = event

    const pool = getPool()

    const history = await pool
      .SELECT<Pick<MessageDatabase, 'role' | 'content'>>`role, content`
      .FROM`message`
      .WHERE`board_id = ${board.id}`
      .AND`team_id = ${team.id}`
      .AND`role IN ('user', 'assistant')`
      .ORDER_BY`send_date DESC`
      .list()

    const requirements = await pool
      .SELECT<Pick<RequirementDatabase, 'title' | 'description'>>`title, description`
      .FROM`requirement`
      .WHERE`board_id = ${board.id}`
      .AND`team_id = ${team.id}`
      .ORDER_BY`"order" ASC`
      .list()

    const openai = deps.openai

    const context: AgentContext = {
      board,
      team,
      user
    }

    try {
      /**
       * Agent 1: Analyze the board requirements, messages, and context to create an overview of the wireflows.
       */
      const summaryAgentResponse = await runSummaryAgent({
        openai,
        context,
        history,
        requirements
      })

      logger.info({ event, summaryAgentResponse }, 'Summary agent completed')

      if (!summaryAgentResponse) {
        logger.info({ event }, 'No summary generated, skipping wireflows creation')

        await pool
          .UPDATE`board_generation`
          .SET({
            status: 'error',
            updateDate: new Date(),
            error: parseError(new Error('No summary generated'))
          })
          .WHERE`tool_call_id = ${event.toolCall.id}`

        return
      }

      /**
       * Agent 2: Create the wireflows based on the summary provided by Agent 1.
       */
      await runWireflowsAgent({
        pool,
        openai,
        context,
        boardSummary: summaryAgentResponse,
        boardGenerationToolCallId: event.toolCall.id
      })

      logger.info({ event }, 'Wireflows created successfully')
    } catch (error) {
      logger.error({ error, event }, 'Error creating wireflows')

      await pool
        .UPDATE`board_generation`
        .SET({
          status: 'error',
          updateDate: new Date(),
          error: parseError(error)
        })
        .WHERE`tool_call_id = ${event.toolCall.id}`
    }
  }
}

function parseError (error: unknown) {
  if (error instanceof OpenAI.OpenAIError) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack
    }
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack
    }
  }

  return {
    name: 'UnknownError',
    message: 'An unknown error occurred'
  }
}
