import fs from 'fs'
import path from 'path'

const REQUIREMENTS_AGENT_PROMPT_ENGLISH = fs.readFileSync(path.join(__dirname, 'requirements-agent-prompt.english.md'), 'utf-8')
const REQUIREMENTS_AGENT_PROMPT_PORTUGUESE = fs.readFileSync(path.join(__dirname, 'requirements-agent-prompt.portuguese.md'), 'utf-8')
const REVIEW_AGENT_PROMPT_ENGLISH = fs.readFileSync(path.join(__dirname, 'review-agent-prompt.english.md'), 'utf-8')
const REVIEW_AGENT_PROMPT_PORTUGUESE = fs.readFileSync(path.join(__dirname, 'review-agent-prompt.portuguese.md'), 'utf-8')
const WIREFLOWS_AGENT_PROMPT_ENGLISH = fs.readFileSync(path.join(__dirname, 'wireflows-agent-prompt.english.md'), 'utf-8')
const WIREFLOWS_AGENT_PROMPT_PORTUGUESE = fs.readFileSync(path.join(__dirname, 'wireflows-agent-prompt.portuguese.md'), 'utf-8')

export const PROMPT_BY_STEP_AND_LANGUAGE: Record<string, Record<string, string>> = {
  requirements: {
    'en': REQUIREMENTS_AGENT_PROMPT_ENGLISH,
    'pt-BR': REQUIREMENTS_AGENT_PROMPT_PORTUGUESE
  },
  review: {
    'en': REVIEW_AGENT_PROMPT_ENGLISH,
    'pt-BR': REVIEW_AGENT_PROMPT_PORTUGUESE
  },
  wireflows: {
    'en': WIREFLOWS_AGENT_PROMPT_ENGLISH,
    'pt-BR': WIREFLOWS_AGENT_PROMPT_PORTUGUESE
  }
}
