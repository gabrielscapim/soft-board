import { MessageDatabase, RequirementDatabase } from 'types/database'
import { AgentContext, StartFlowAgent } from '../../../../startflow-agent'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { logger } from '../../../../libs'

type RunSummaryAgentCommand = {
  openai: OpenAI
  context: AgentContext
  history: Pick<MessageDatabase, 'role' | 'content'>[]
  requirements: Pick<RequirementDatabase, 'title' | 'description'>[]
}

type RunSummaryAgentResult = {
  isWireflowPossible: boolean
  summary: string
  invalidReason?: string
}

export async function runSummaryAgent (
  command: RunSummaryAgentCommand
): Promise<RunSummaryAgentResult> {
  const {
    openai,
    context,
    history,
    requirements
  } = command

  const basePrompt = fs.readFileSync(
    path.join(__dirname, 'prompt.md'),
    'utf-8'
  )
  const historyPrompt = `
    ### Conversation History
    ${history.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n')}
  `
  const requirementsPrompt = `
    ### Requirements
    ${requirements.map(req => `- ${req.title}: ${req.description}`).join('\n')}
  `

  const agent = new StartFlowAgent({
    context,
    openai,
    model: 'gpt-4o',
    prompt: [
      basePrompt,
      historyPrompt,
      requirementsPrompt
    ],
    responseFormat: {
      type: 'json_schema',
      json_schema: {
        name: 'board_summary',
        description: 'Summary and validation of wireflow feasibility.',
        schema: {
          type: 'object',
          properties: {
            isWireflowPossible: {
              type: 'boolean',
              description: 'Indicates whether the conversation and requirements are sufficient to generate a wireflow.'
            },
            summary: {
              type: 'string',
              description: 'A concise summary of the board creation process.'
            },
            invalidReason: {
              type: 'string',
              description: 'If isWireflowPossible is false, provide the reason why.'
            }
          },
          required: ['isWireflowPossible']
        }
      }
    }
  })

  const response = await agent.run('Do what was asked')

  const result = getFormattedResponse((response[0].content ?? null) as string | null)

  return result
}

function getFormattedResponse (content: string | null): RunSummaryAgentResult {
  if (content === null) {
    return {
      summary: '',
      invalidReason: 'Error: No content returned from agent',
      isWireflowPossible: false
    }
  }

  try {
    const parsed: RunSummaryAgentResult = JSON.parse(content)

    return parsed
  } catch {
    logger.error({ content }, 'Failed to parse agent response as JSON')

    return {
      summary: '',
      invalidReason: 'An error occurred while generating agent response.',
      isWireflowPossible: false
    }
  }
}
