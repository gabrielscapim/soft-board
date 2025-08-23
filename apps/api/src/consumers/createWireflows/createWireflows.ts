import { AgentCalledFunctionEvent } from 'event-types'
import OpenAI from 'openai'
import { getPool, logger } from '../../libs'
import { RequirementDatabase } from 'types/database'
import { AgentContext } from '../../startflow-agent'
import { runOverviewAgent, runScreenAgent } from './methods'

export const exchange = 'agentCalledFunction'

export const key = 'createWireflows'

type Deps = {
  openai: OpenAI
}

type RequirementRow = Pick<RequirementDatabase, 'title' | 'description'>

export function consumer (deps: Deps) {
  return async (event: AgentCalledFunctionEvent) => {
    const { board, team, user } = event

    const pool = getPool()

    const requirements = await pool
      .SELECT<RequirementRow>`title, description`
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

    if (board.status === 'pending') {
      logger.info({ event }, 'Board is already pending, skipping create wireflows')
      return
    }

    try {
      /**
       * Agent 1: Analyze the board requirements, messages, and context to answer
       * how many screens are needed for the wireflows and describe them.
       */
      const overviewAgentResponse = await runOverviewAgent(openai, context, requirements)

      /**
       * Agent 2: Create the wireflows based on the overview agent's response.
       */
      const screensAgentResponse = await Promise.all(overviewAgentResponse.screens.map(
        screen => runScreenAgent(openai, context, screen)
      ))

      let xSpace = 0

      for (const screen of screensAgentResponse) {
        for (const component of screen.components) {
          await pool
            .INSERT_INTO`component`
            .VALUES({
              teamId: context.team.id,
              boardId: context.board.id,
              name: component.name,
              type: component.type,
              properties: JSON.stringify({
                ...component.properties,
                x: component.properties.x + xSpace
              })
            })
        }

        xSpace = xSpace + 500
      }

      await pool
        .UPDATE`board`
        .SET({ status: 'idle' })
        .WHERE`id = ${board.id}`

      logger.info({ event }, 'Wireflows created successfully')
    } catch (error) {
      logger.error({ error, event }, 'Error creating wireflows')

      await pool
        .UPDATE`board`
        .SET({ status: 'error' })
        .WHERE`id = ${board.id}`
    }
  }
}
