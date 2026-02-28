import { AgentCalledFunctionEvent } from 'event-types'
import OpenAI from 'openai'
import { getPool, logger } from '../../libs'
import { captureScreens, generateReview } from './methods'
import { GetApplicationDependencies } from '../../types'
import { UserPreferencesDatabase } from 'types/database/user-preferences/user-preferences'

export const exchange = 'agent.calledFunction'

export const key = 'reviewWireflows'

export function consumer (getDeps: GetApplicationDependencies) {
  return async (event: AgentCalledFunctionEvent) => {
    const { board, team, user, toolCall } = event
    const { openai, websocketEmitters } = getDeps()

    const pool = getPool()

    logger.info({ event }, 'Starting review wireflows')

    try {
      const userPreferences = await pool
        .SELECT<Pick<UserPreferencesDatabase, 'language'>>`language`
        .FROM`user_preferences`
        .WHERE`user_id = ${user.id}`
        .first()

      const { screenBuffers } = await captureScreens({
        pool,
        user,
        board,
        team
      })

      logger.info(
        { event, screenBuffersLength: screenBuffers?.length },
        'Captured screens for review wireflows'
      )

      if (!screenBuffers) {
        return
      }

      const { review } = await generateReview(
        { openai, pool },
        { boardId: board.id, teamId: team.id, screenBuffers, language: userPreferences?.language ?? 'en' }
      )

      logger.info({ event, review }, 'Review wireflows completed')

      const totalScore = review.reduce((acc, item) => {
        if (item.score) {
          return acc + item.score
        }

        return acc
      }, 0)

      const score = Math.round((totalScore / review.length) * 100) / 100
      const now = new Date()

      await pool
        .UPDATE`board_review`
        .SET({
          status: 'completed',
          review: JSON.stringify(review),
          score,
          reviewDate: now,
          updateDate: now
        })
        .WHERE`tool_call_id = ${toolCall.id}`
        .AND`board_id = ${board.id}`

      await pool
        .UPDATE`message`
        .SET({
          content: JSON.stringify({ review, score })
        })
        .WHERE`board_id = ${board.id}`
        .AND`tool_call_id = ${toolCall.id}`
    } catch (error) {
      logger.error({ error: parseError(error), event }, 'Error reviewing wireflows')

      await pool
        .UPDATE`board_review`
        .SET({
          status: 'error',
          updateDate: new Date(),
          error: parseError(error)
        })
        .WHERE`tool_call_id = ${toolCall.id}`
        .AND`board_id = ${board.id}`

      await pool
        .UPDATE`message`
        .SET({
          content: 'Error reviewing wireflows'
        })
        .WHERE`board_id = ${board.id}`
        .AND`tool_call_id = ${toolCall.id}`
    }

    const room = `board:${board.id}`
    websocketEmitters.agentReviewedBoard.emit({ boardId: board.id }, [room])
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
