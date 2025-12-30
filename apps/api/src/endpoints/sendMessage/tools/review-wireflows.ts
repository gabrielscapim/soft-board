import { DatabasePool } from 'pg-script'
import { AgentContext, RunToolResult, Tool } from '../../../startflow-agent'
import { IPublisher } from '../../../types'
import { AgentCalledFunctionEvent } from 'event-types'

export class ReviewWireflowsTool extends Tool {
  name = 'review_wireflows'
  description = 'Review wireflows based on usability heuristics'
  generateCompletion = false

  parametersSchema () {
    return {
      type: 'object',
      properties: {}
    }
  }

  async run (_args: Record<string, any>, context: AgentContext, id: string): Promise<RunToolResult> {
    const { pool, publishers } = this.data as { pool: DatabasePool, publishers: Record<string, IPublisher<any>> }

    const event: AgentCalledFunctionEvent = {
      toolCall: { id },
      board: context.board,
      team: context.team,
      user: context.user
    }

    publishers.agentCalledFunction.publish(event, 'reviewWireflows')

    await pool
      .INSERT_INTO`board_review`
      .VALUES({
        teamId: context.team.id,
        boardId: context.board.id,
        status: 'pending',
        toolCallId: id
      })

    return {
      content: 'Review wireflows requested successfully. In few moments you will have the review ready.'
    }
  }
}
