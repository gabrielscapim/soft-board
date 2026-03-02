import { AgentCalledFunctionEvent } from 'event-types'
import OpenAI from 'openai'
import { logger } from '../../libs'
import { MessageDatabase, RequirementDatabase, UserPreferencesDatabase } from 'types/database'
import { AgentContext } from '../../soft-board-agent'
import { runSummaryAgent } from './methods/runSummaryAgent'
import { runWireflowsAgent } from './methods'
import { GetApplicationDependencies } from '../../types'

export const exchange = 'agent.calledFunction'

export const key = 'createWireflows'

export function consumer (getDeps: GetApplicationDependencies) {
  return async (event: AgentCalledFunctionEvent) => {
    const { pool, openai, websocketEmitters } = getDeps()
    const { board, team, user, toolCall } = event

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

    const userPreferences = await pool
      .SELECT<Pick<UserPreferencesDatabase, 'language'>>`language`
      .FROM`user_preferences`
      .WHERE`user_id = ${user.id}`
      .first()

    const language = userPreferences?.language ?? 'en'

    const context: AgentContext = {
      board,
      team,
      user
    }

    const websocketRoom = `board:${board.id}`

    try {
      /**
       * Agent 1: Analyze the board requirements, messages, and context to create an overview of the wireflows.
       */
      const summaryAgentResponse = await runSummaryAgent({
        openai,
        context,
        history,
        requirements,
        language
      })

      logger.info({ event, summaryAgentResponse }, 'Summary agent completed')

      if (summaryAgentResponse.isWireflowPossible === false) {
        logger.info({ event }, 'No summary generated, skipping wireflows creation')

        await pool
          .UPDATE`board_generation`
          .SET({
            status: 'error',
            updateDate: new Date(),
            error: parseError(new Error(summaryAgentResponse.invalidReason ?? 'No summary generated'))
          })
          .WHERE`tool_call_id = ${toolCall.id}`

        await pool
          .UPDATE`message`
          .SET({
            content: summaryAgentResponse.invalidReason ?? 'Wireflow generation is not possible based on the provided requirements.',
            updateDate: new Date()
          })
          .WHERE`board_id = ${board.id}`
          .AND`tool_call_id = ${toolCall.id}`

        websocketEmitters.agentCreatedWireflow.emit({ boardId: board.id }, [websocketRoom])

        return
      }

      /**
       * Agent 2: Create the wireflows based on the summary provided by Agent 1.
       */
      await runWireflowsAgent({
        pool,
        openai,
        context,
        boardSummary: summaryAgentResponse.summary,
        boardGenerationToolCallId: event.toolCall.id,
        language
      })

      await pool
        .UPDATE`message`
        .SET({
          content: 'Wireflows have been successfully generated.',
          updateDate: new Date()
        })
        .WHERE`board_id = ${board.id}`
        .AND`tool_call_id = ${event.toolCall.id}`

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

      await pool
        .UPDATE`message`
        .SET({
          content: 'An error occurred while generating the wireflows.',
          updateDate: new Date()
        })
        .WHERE`board_id = ${board.id}`
        .AND`tool_call_id = ${event.toolCall.id}`
    }

    websocketEmitters.agentCreatedWireflow.emit({ boardId: board.id }, [websocketRoom])
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
