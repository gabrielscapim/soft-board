import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { AgentContext, SoftBoardAgent } from '../../../../soft-board-agent'
import { CreateWireflowTool } from './tool'
import { DatabasePool } from 'pg-script'

type RunWireflowsAgentCommand = {
  openai: OpenAI
  context: AgentContext
  boardSummary: string
  pool: DatabasePool
  boardGenerationToolCallId: string
  language: string
}

export async function runWireflowsAgent (
  command: RunWireflowsAgentCommand
): Promise<void> {
  const {
    openai,
    context,
    boardSummary,
    pool,
    boardGenerationToolCallId,
    language
  } = command

  const fileName = language === 'en' ? 'prompt.english.md' : 'prompt.portuguese.md'

  const prompt = fs.readFileSync(
    path.join(__dirname, fileName),
    'utf-8'
  )

  const agent = new SoftBoardAgent({
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
