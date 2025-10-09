import { schema } from './schema'
import { RunToolResult, Tool } from '../../../../startflow-agent'
import { logger } from '../../../../libs'

type Arguments = {
  screens: Array<{
    name: string
    components: Array<{
      name: string
      type: string
      properties: Record<string, any>
    }>
  }>
}

export class CreateWireflowTool extends Tool {
  name = 'create_wireflows'
  description = 'Creates a new wireflow.'
  generateCompletion = false

  parametersSchema () {
    return schema
  }

  async run (args: Arguments): Promise<RunToolResult> {
    // TO-DO - Save the wireflows to the database
    logger.info({ args }, 'Creating wireflows')

    return {
      content: 'Wireflows created successfully',
      messages: [
        {
          role: 'assistant',
          content: 'Wireflows created successfully'
        }
      ]
    }
  }
}
