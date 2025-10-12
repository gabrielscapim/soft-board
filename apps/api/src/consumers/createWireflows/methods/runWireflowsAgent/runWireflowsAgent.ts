import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { AgentContext, StartFlowAgent } from '../../../../startflow-agent'
import { CreateWireflowTool } from './tool'
import { DatabasePool } from 'pg-script'

type RunWireflowsAgentCommand = {
  openai: OpenAI
  context: AgentContext
  boardSummary: string
  pool: DatabasePool
  boardGenerationToolCallId: string
}

export async function runWireflowsAgent (
  command: RunWireflowsAgentCommand
): Promise<void> {
  const {
    openai,
    context,
    boardSummary,
    pool,
    boardGenerationToolCallId
  } = command

  const prompt = fs.readFileSync(
    path.join(__dirname, 'prompt.md'),
    'utf-8'
  )

  const agent = new StartFlowAgent({
    context,
    openai,
    tools: [
      new CreateWireflowTool({ pool, boardGenerationToolCallId })
    ],
    prompt,
    toolChoice: 'required'
  })

  await agent.run(boardSummary)
}
