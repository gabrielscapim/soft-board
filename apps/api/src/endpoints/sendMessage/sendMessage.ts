import { SendMessageCommand, SendMessageResult } from 'types/endpoints'
import { RequestHandler } from 'express'
import { getPool } from '../../libs'
import OpenAI, { OpenAIError } from 'openai'
import * as yup from 'yup'
import { DatabasePool } from 'pg-script'
import { ChatCompletionMessageParam } from 'openai/resources/index'
import { MessageDatabase } from 'types/database'
import removeMd from 'remove-markdown'

type Handler = RequestHandler<unknown, SendMessageResult, SendMessageCommand>

type MessageRow = Pick<MessageDatabase, 'role' | 'content'> & { userName: string | null }

type Deps = {
  openai: OpenAI
}

const schema = yup.object({
  content: yup.string().required('Message is required'),
  boardId: yup.string().required('Board ID is required')
})

export function handler ({ openai }: Deps): Handler {
  return async (req, res) => {
    const { content, boardId } = await schema.validate(req.body, { abortEarly: false })
    const teamId = req.team!.teamId
    const userId = req.auth!.userId

    const pool = getPool()

    const history = await getHistory(pool, boardId)
    const { response, error } = await completeMessage(openai, content, history)

    const result = await pool.transaction(async pool => {
      await pool
        .INSERT_INTO`message`
        .VALUES({
          teamId,
          boardId,
          authorId: userId,
          content: content,
          role: 'user',
          sendDate: new Date()
        })

      const { rows: [message] } = await pool
        .INSERT_INTO`message`
        .VALUES({
          teamId,
          boardId: boardId,
          content: response ? removeMd(response) : null,
          role: 'assistant',
          sendDate: new Date(),
          error
        })
        .RETURNING<{ id: string }>`id`

      return {
        id: message.id,
        content: response
      }
    })

    res.status(201).json(result)
  }
}

async function getHistory (
  pool: DatabasePool,
  boardId: string
): Promise<Array<ChatCompletionMessageParam>> {
  const messages = await pool
    .SELECT<MessageRow>`
      message.role,
      message.content,
      "user".name as "userName"`
    .FROM`message`
    .WHERE`board_id = ${boardId}`
    .LEFT_JOIN`"user" ON "user".id = message.author_id`
    .ORDER_BY`send_date ASC`
    .LIMIT(10)
    .list()

  const history = messages.map(message => {
    return {
      role: message.role,
      content: message.content,
      name: message.userName ?? undefined
    }
  }) as Array<ChatCompletionMessageParam>

  return history
}

async function completeMessage (
  openai: OpenAI,
  content: string,
  history: Array<ChatCompletionMessageParam>
): Promise<{ response: string | null, error?: { name: string, message: string, stack?: string } }> {
  const messages: Array<ChatCompletionMessageParam> = [
    {
      role: 'system',
      content: PROMPT
    },
    ...history,
    {
      role: 'user',
      content: content
    }
  ]

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages
    })
    const response = completion.choices[0].message.content

    return {
      response
    }
  } catch (error) {
    const response = 'An error occurred while processing your message.'

    if (error instanceof OpenAIError) {
      return {
        response,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack
        }
      }
    }

    return {
      response
    }
  }
}

// eslint-disable-next-line no-useless-escape
const PROMPT = 'You are an expert agent in the StartFlow method, designed to support software startups in building MVPs using wireflows (a combination of wireframes and user flows). Your role is to guide the user through three main stages, always focused on UX, speed, and low cost. Below are your operational instructions:\n\nSTAGE 1: UNDERSTAND AND ORGANIZE FEATURES\nGoal: Help the user identify and prioritize features to represent visually.\n- Ask if the user already has any artifacts (post-its, backlog, documents, etc.).\n- If not, use the questions below to help identify features.\n- Encourage the user story structure: \"As a [user type], I want [goal], so that [benefit]\".\n- Request feature prioritization.\n\nQuestion prompts for identifying features:\n- On a first contact with the application, what tasks should the user be able to perform?\n- For returning users, what tasks should they be able to execute?\n- What market demand does the application aim to meet? How?\n- Are there competitors? What tasks are similar? What is innovative?\n\nQuestion prompts for organizing features:\n- Have the relevant features been selected?\n- Is there any other feature that could be used right now?\n- What is the most important feature? And the next one?\n\nSTAGE 2: BUILD THE WIREFLOWS\nGoal: Create visual representations (wireflows) of each prioritized feature.\n- Help the user create the flows using:\n  • Layouts: fields, lists, sliders, etc.\n  • Triggers: buttons, icons, links.\n  • Connectors: arrows between screens.\n- Allow digital tools (e.g., Figma) or pen and paper.\n- Suggest using design standards like Material Design and Apple HIG.\n\nQuestion prompts:\n- How many screens are needed for this feature?\n- What UI elements should be on each screen?\n- What screen does the trigger lead to?\n- What happens if the user enters invalid data?\n- Can the user go back to a previous screen?\n- Can this task be done with fewer clicks?\n- What happens when the task is completed?\n\nSTAGE 3: VERIFY AND REFINE THE WIREFLOWS\nGoal: Evaluate and improve the wireflows to ensure good UX.\n- Review the flows with the user using the criteria below.\n- Refine before moving to the next feature.\n- If possible, encourage validation with real users.\n\nEvaluation criteria:\n1. Efficiency: Does each screen have at least one trigger?\n2. Feedback: Is there a screen confirming task completion?\n3. Clarity (text): Are textual triggers clearly described?\n4. Clarity (icons): Do icon-based triggers clearly communicate their action?\n5. Error prevention: Are required fields marked?\n6. Error recovery: Are errors handled with appropriate screens?\n7. Flexibility: Can users undo actions or go back?\n8. Consistency: Do all connectors originate from triggers?\n\nFINAL RESULT\nBy the end of the process, the user will have a refined set of wireflows that visually represent MVP functionalities, ready for prototyping or validation. You should continue iterating with the user as new features are defined.'

