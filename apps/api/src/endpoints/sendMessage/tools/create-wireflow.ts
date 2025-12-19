import { AgentCalledFunctionEvent } from 'event-types'
import { AgentContext, RunToolResult, Tool } from '../../../startflow-agent'
import { IPublisher } from '../../../types'
import { DatabasePool } from 'pg-script'

export class CreateWireflowTool extends Tool {
  name = 'create_wireflows'
  description = 'Create wireflows'
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

    publishers.agentCalledFunction.publish(event, 'createWireflows')

    await pool
      .INSERT_INTO`board_generation`
      .VALUES({
        teamId: context.team.id,
        boardId: context.board.id,
        status: 'pending',
        toolCallId: id
      })

    return {
      content: 'Create wireflows requested successfully. In few moments you will have the wireflows ready.'
    }
  }
}
