import { MessageDatabase, RequirementDatabase } from 'types/database'
import { AgentContext, StartFlowAgent } from '../../../../startflow-agent'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

type RunSummaryAgentCommand = {
  openai: OpenAI
  context: AgentContext
  history: Pick<MessageDatabase, 'role' | 'content'>[]
  requirements: Pick<RequirementDatabase, 'title' | 'description'>[]
}

export async function runSummaryAgent (
  command: RunSummaryAgentCommand
): Promise<string | null> {
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
    prompt: [
      basePrompt,
      historyPrompt,
      requirementsPrompt
    ]
  })

  const response = await agent.run('Do what was asked')

  const result = typeof response[0].content === 'string' ? response[0].content : null

  return result
}
