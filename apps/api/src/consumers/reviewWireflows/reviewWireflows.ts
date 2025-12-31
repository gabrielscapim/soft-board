import { AgentCalledFunctionEvent } from 'event-types'
import OpenAI from 'openai'
import { getPool, logger } from '../../libs'
import { captureScreens, generateReview } from './methods'

export const exchange = 'agentCalledFunction'
export const key = 'reviewWireflows'

type Deps = {
  openai: OpenAI
}

export function consumer ({ openai }: Deps) {
  return async (event: AgentCalledFunctionEvent) => {
    const { board, team, user, toolCall } = event

    const pool = getPool()

    logger.info({ event }, 'Starting review wireflows')

    try {
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
        { boardId: board.id, teamId: team.id, screenBuffers }
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
      logger.error({ error, event }, 'Error reviewing wireflows')

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
