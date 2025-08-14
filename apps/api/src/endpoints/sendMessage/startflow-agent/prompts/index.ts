import fs from 'fs'
import path from 'path'

export const REQUIREMENTS_AGENT_PROMPT = fs.readFileSync(path.join(__dirname, 'requirements-agent-prompt.md'), 'utf-8')
export const REVIEW_AGENT_PROMPT = fs.readFileSync(path.join(__dirname, 'review-agent-prompt.md'), 'utf-8')
export const WIREFLOWS_AGENT_PROMPT = fs.readFileSync(path.join(__dirname, 'wireflows-agent-prompt.md'), 'utf-8')
