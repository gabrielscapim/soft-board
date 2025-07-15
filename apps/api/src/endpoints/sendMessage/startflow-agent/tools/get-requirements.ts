import { RequirementDatabase } from 'types/database'
import { Tool } from '../core'

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

  async run (): Promise<string> {
    const requirements = await this.pool
      .SELECT<RequirementRow>`id, title, description`
      .FROM`requirement`
      .WHERE`board_id = ${this.boardId}`
      .list()

    if (requirements.length === 0) {
      return 'No requirements found.'
    }

    const response = requirements.reduce((acc, req) => {
      return acc + `### ${req.title ?? 'Unnamed'} (ID: ${req.id})\n${req.description ?? 'No description'}\n\n`
    }, '')

    return response
  }
}
