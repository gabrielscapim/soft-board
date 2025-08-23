import { RequirementDatabase } from 'types/database'
import { AgentContext, ResponseFormat, StartFlowAgent } from '../../../../startflow-agent'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { logger } from '../../../../libs'

const responseFormat: ResponseFormat = {
  type: 'json_schema',
  json_schema: {
    name: 'screens',
    description: 'List of screens for the wireflows',
    schema: {
      type: 'object',
      properties: {
        screens: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
            },
            required: ['title'],
            additionalProperties: false
          }
        }
      },
      required: ['screens'],
      additionalProperties: false
    },
    strict: true
  }
}

type Response = {
  screens: {
    title: string
    description: string
    reasoning: string
  }[]
}

export async function runOverviewAgent (
  openai: OpenAI,
  context: AgentContext,
  requirements: Pick<RequirementDatabase, 'title' | 'description'>[]
): Promise<Response> {
  const basePrompt = fs.readFileSync(
    path.join(__dirname, 'prompt.md'),
    'utf-8'
  )
  const requirementsPrompt = `
    ### Requirements
    ${requirements.map(req => `- ${req.title}: ${req.description}`).join('\n')}
  `

  const agent = new StartFlowAgent({
    context,
    openai,
    prompt: [
      basePrompt,
      requirementsPrompt
    ],
    responseFormat
  })

  const startWithResponseFormat = performance.now()
  const result = await agent.run('Generate a list of screens for the wireflows')
  const endWithResponseFormat = performance.now()

  logger.info({ duration: endWithResponseFormat - startWithResponseFormat, response: result }, 'Overview agent completed with response format')

  const response = JSON.parse((result[0].content as string | undefined) ?? '{ screens: [] }') as Response

  return response
}
