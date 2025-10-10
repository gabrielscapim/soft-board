import { AgentCalledFunctionEvent } from 'event-types'
import { AgentContext, RunToolResult, Tool } from '../../../startflow-agent'
import { IPublisher } from '../../../types'
import { DatabasePool } from 'pg-script'

export class CreateWireflowTool extends Tool {
  name = 'create_wireflows'
  description = 'Create wireflows'
  generateCompletion = true

  parametersSchema () {
    return {
      type: 'object',
      properties: {}
    }
  }

  async run (_args: Record<string, any>, context: AgentContext): Promise<RunToolResult> {
    const { pool, publishers } = this.data as { pool: DatabasePool, publishers: Record<string, IPublisher<any>> }

    const event: AgentCalledFunctionEvent = {
      board: context.board,
      team: context.team,
      user: context.user
    }

    publishers.agentCalledFunction.publish(event, 'createWireflows')

    await pool
      .UPDATE`board`
      .SET({ status: 'pending' })
      .WHERE`id = ${context.board.id}`

    return {
      content: 'Create wireflows requested successfully. In few moments you will see the changes reflected in your board.'
    }
  }
}
