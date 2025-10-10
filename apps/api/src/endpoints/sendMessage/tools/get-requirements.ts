import { RequirementDatabase } from 'types/database'
import { AgentContext, RunToolResult, Tool } from '../../../startflow-agent'
import { DatabasePool } from 'pg-script'

type RequirementRow = Pick<RequirementDatabase, 'id' | 'title' | 'description'>

export class GetRequirementsTool extends Tool {
  name = 'get_requirements'
  description = 'Retrieves current requirements. Including id, title, and description.'
  generateCompletion = true

  parametersSchema () {
    return {
      type: 'object',
      properties: {}
    }
  }

  async run (_args: Record<string, any>, context: AgentContext): Promise<RunToolResult> {
    const { pool } = this.data as { pool: DatabasePool }

    const requirements = await pool
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
