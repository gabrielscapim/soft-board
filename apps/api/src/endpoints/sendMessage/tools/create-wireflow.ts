import { AgentCalledFunctionEvent } from 'event-types'
import { AgentContext, RunToolResult, Tool } from '../../../startflow-agent'

export class CreateWireflowTool extends Tool {
  name = 'create_wireflows'
  description = 'Create wireflows'

  parametersSchema () {
    return {
      type: 'object',
      properties: {}
    }
  }

  async run (_args: Record<string, any>, context: AgentContext): Promise<RunToolResult> {
    const event: AgentCalledFunctionEvent = {
      board: context.board,
      team: context.team,
      user: context.user
    }

    this.publishers.agentCalledFunction.publish(event, 'createWireflows')

    await this.pool
      .UPDATE`board`
      .SET({ status: 'pending' })
      .WHERE`id = ${context.board.id}`

    return {
      content: 'Create wireflows requested successfully. In few moments you will see the changes reflected in your board.'
    }
  }
}
