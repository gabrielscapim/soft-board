import { RequirementDatabase } from 'types/database'
import { AgentContext, RunToolResult, Tool } from '../core'

type RequirementRow = Pick<RequirementDatabase, 'id' | 'title' | 'description'>

export class GetRequirementsTool extends Tool {
  name = 'get_requirements'
  description = 'Retrieves current requirements. Including id, title, and description.'

  parametersSchema () {
    return {
      type: 'object',
      properties: {}
    }
  }

  async run (_args: Record<string, any>, context: AgentContext): Promise<RunToolResult> {
    const requirements = await this.pool
      .SELECT<RequirementRow>`id, title, description`
      .FROM`requirement`
      .WHERE`board_id = ${context.board.id}`
      .list()

    if (requirements.length === 0) {
      return {
        content: 'No requirements found.'
      }
    }

    const response = requirements.reduce((acc, req) => {
      return acc + `### ${req.title ?? 'Unnamed'} (ID: ${req.id})\n${req.description ?? 'No description'}\n\n`
    }, '')

    return {
      content: response
    }
  }
}
