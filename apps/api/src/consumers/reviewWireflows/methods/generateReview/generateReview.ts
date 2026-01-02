import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { ChatCompletionContentPartImage, ChatCompletionCreateParamsNonStreaming } from 'openai/resources.js'
import { logger } from '../../../../libs'
import { DatabasePool } from 'pg-script'

export type GenerateReviewCommand = {
  boardId: string
  teamId: string
  screenBuffers: Buffer<ArrayBufferLike>[]
}

export type GenerateReviewDeps = {
  openai: OpenAI
  pool: DatabasePool
}

type ReviewItem = {
  applicable: boolean
  explanation: string
  score?: number
  suggestions?: string[]
  notApplicableReason?: string
}

export type FormattedCompletionResponse = {
  reviews: Record<Exclude<ReviewKey, 'startflow_1'>, ReviewItem> | null
}

export type GenerateReviewResult = {
  review: ({ title: string, description: string } & ReviewItem)[]
}

type ReviewKey =
  | 'nielsen_2'
  | 'nielsen_4'
  | 'nielsen_6'
  | 'nielsen_8'
  | 'startflow_1'
  | 'startflow_2'
  | 'startflow_3'
  | 'startflow_4'

const REVIEWS_MAP: Record<ReviewKey, { title: string, description: string }> = {
  startflow_1: {
    title: 'StartFlow Criterion 1: Trigger availability',
    description: 'Does every screen contain at least one trigger that allows the user to continue or go back?'
  },
  startflow_2: {
    title: 'StartFlow Criterion 2: Completion feedback',
    description: 'Is there a screen that clearly communicates to the user that the task has been completed?'
  },
  startflow_3: {
    title: 'StartFlow Criterion 3: Text-based triggers',
    description: 'Do text-based triggers clearly describe the action that will be executed?'
  },
  startflow_4: {
    title: 'StartFlow Criterion 4: Icon-based triggers',
    description: 'Are icon-based triggers clear and unambiguous?'
  },
  nielsen_2: {
    title: 'Nielsen Heuristic 2: Match between system and the real world',
    description: 'The interface should speak the user\'s language, using familiar terms, concepts, and structures. Information should appear in a natural and logical order.'
  },
  nielsen_4: {
    title: 'Nielsen Heuristic 4: Consistency and standards',
    description: 'The user should not have doubts if different elements mean the same thing. Follow platform conventions and visual patterns.'
  },
  nielsen_6: {
    title: 'Nielsen Heuristic 6: Recognition rather than recall',
    description: 'Reduce the user\'s memory load by making actions, objects, and instructions visible and easy to retrieve whenever necessary.'
  },
  nielsen_8: {
    title: 'Nielsen Heuristic 8: Aesthetic and minimalist design',
    description: 'Only relevant information should be displayed. Unnecessary content competes with important information and reduces clarity.'
  }
}

function mapReviewsToResult (
  reviews: FormattedCompletionResponse['reviews']
): GenerateReviewResult['review'] {
  if (!reviews) {
    return []
  }

  return Object.entries(reviews).map(([key, item]) => ({
    ...REVIEWS_MAP[key as ReviewKey],
    ...item
  }))
}

export async function generateReview (
  deps: GenerateReviewDeps,
  command: GenerateReviewCommand
): Promise<GenerateReviewResult> {
  const { openai, pool } = deps
  const { boardId, teamId, screenBuffers } = command

  const prompt = fs.readFileSync(
    path.join(__dirname, 'prompt.md'),
    'utf-8'
  )

  const imageContents = screenBuffers.map<ChatCompletionContentPartImage>(imageBuffer => ({
    type: 'image_url',
    image_url: {
      url: `data:image/png;base64,${imageBuffer.toString('base64')}`
    }
  }))

  const completion = await openai.chat.completions.create({
    model: 'gpt-5.2',
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: 'Please review the following wireflow screens in English.' },
      { role: 'user', content: imageContents }
    ],
    response_format: buildResponseFormat()
  })

  const formattedAiReviews = getFormattedCompletionResponse(completion.choices[0].message.content)

  const aiReviews = mapReviewsToResult(formattedAiReviews.reviews)

  const startFlow1Review = await generateStartFlow1Review(pool, { boardId, teamId })

  return {
    review: [
      {
        ...REVIEWS_MAP.startflow_1,
        ...startFlow1Review
      },
      ...aiReviews
    ]
  }
}

function buildResponseFormat (): ChatCompletionCreateParamsNonStreaming['response_format'] {
  const reviewItemSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      applicable: {
        type: 'boolean',
        description: 'Whether this criterion applies to the evaluated wireflow'
      },
      explanation: {
        type: 'string',
        description: 'Brief explanation of the evaluation'
      },
      score: {
        type: 'integer',
        minimum: 1,
        maximum: 5,
        description: 'Likert scale score (1 = very poor, 5 = excellent)'
      },
      suggestions: {
        type: 'array',
        items: { type: 'string' },
        description: 'Improvement suggestions (if applicable)'
      },
      notApplicableReason: {
        type: 'string',
        description: 'Reason when the criterion does not apply'
      }
    },
    required: ['applicable', 'explanation']
  }

  return {
    type: 'json_schema',
    json_schema: {
      name: 'review_wireflows_response',
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          reviews: {
            type: 'object',
            additionalProperties: false,
            properties: {
              startflow_2: reviewItemSchema,
              startflow_3: reviewItemSchema,
              startflow_4: reviewItemSchema,
              nielsen_2: reviewItemSchema,
              nielsen_4: reviewItemSchema,
              nielsen_6: reviewItemSchema,
              nielsen_8: reviewItemSchema
            },
            required: [
              'startflow_2',
              'startflow_3',
              'startflow_4',
              'nielsen_2',
              'nielsen_4',
              'nielsen_6',
              'nielsen_8'
            ]
          }
        },
        required: ['reviews']
      }
    }
  }
}

function getFormattedCompletionResponse (content: string | null): FormattedCompletionResponse {
  if (content === null) {
    return { reviews: null }
  }

  try {
    return JSON.parse(content) as FormattedCompletionResponse
  } catch (error) {
    logger.error({ error, content }, 'Failed to parse review wireflows response')
    return { reviews: null }
  }
}

async function generateStartFlow1Review (
  pool: DatabasePool,
  command: { boardId: string, teamId: string }
): Promise<ReviewItem> {
  const { boardId, teamId } = command

  const screensWithoutConnections = await pool
    .SELECT<{ id: string, name: string }>`s.id, s.name`
    .FROM`component s`
    .WHERE`s.board_id = ${boardId}`
    .AND`s.team_id = ${teamId}`
    .AND`s.board_generation_id IS NULL`
    .AND`s.type = 'mobileScreen'`
    .AND`s.deleted = false`
    .AND`NOT EXISTS (
      SELECT 1
      FROM component c
      WHERE c.screen_id = s.id
        AND c.connection_id IS NOT NULL
        AND c.deleted = false
    )`
    .list()

  const hasScreensWithoutConnections = screensWithoutConnections.length > 0

  return {
    applicable: true,
    explanation: hasScreensWithoutConnections
      ? `Found ${screensWithoutConnections.length} screen(s) without triggers: ${screensWithoutConnections.map(s => s.name).join(', ')}`
      : 'All screens have at least one trigger that allows the user to continue or go back.',
    score: hasScreensWithoutConnections ? 1 : 5,
    suggestions: hasScreensWithoutConnections
      ? screensWithoutConnections.map(s => `Add triggers to screen "${s.name}" to allow navigation`)
      : undefined
  }
}
