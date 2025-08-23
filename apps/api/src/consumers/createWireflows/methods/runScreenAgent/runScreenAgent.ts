import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { AgentContext, ResponseFormat, StartFlowAgent } from '../../../../startflow-agent'

type Response = {
  components: {
    name: string
    type: string
    properties: Record<string, any>
  }[]
}

const responseFormat: ResponseFormat = JSON.parse(fs.readFileSync(path.join(__dirname, 'response-format.json'), 'utf-8'))

export async function runScreenAgent (
  openai: OpenAI,
  context: AgentContext,
  screen: { title: string, description: string }
): Promise<Response> {
  const basePrompt = fs.readFileSync(
    path.join(__dirname, 'prompt.md'),
    'utf-8'
  )
  const screenPrompt = `
    ### Screen: ${screen.title}
    ${screen.description}
  `

  const agent = new StartFlowAgent({
    context,
    openai,
    prompt: [
      basePrompt,
      screenPrompt
    ],
    responseFormat
  })

  const result = await agent.run('Create the screen')
  const response = JSON.parse((result[0].content as string | undefined) ?? '{ components: [] }') as Response

  return response
}
