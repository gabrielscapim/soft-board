import fs from 'fs'
import path from 'path'

export const REQUIREMENTS_AGENT_PROMPT = fs.readFileSync(path.join(__dirname, 'requirements-agent-prompt.md'), 'utf-8')
