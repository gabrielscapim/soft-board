import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { ChatCompletionContentPartImage, ChatCompletionCreateParamsNonStreaming } from 'openai/resources.js'
import { logger } from '../../../../libs'

export type GenerateReviewCommand = {
  openai: OpenAI
  screenBuffers: Buffer<ArrayBufferLike>[]
}

type ReviewItem = {
  applicable: boolean
  explanation: string
  score?: number
  suggestions?: string[]
  notApplicableReason?: string
}

export type FormattedCompletionResponse = {
  reviews: {
    nielsen_2: ReviewItem
    nielsen_4: ReviewItem
    nielsen_6: ReviewItem
    nielsen_8: ReviewItem
    startflow_2: ReviewItem
    startflow_3: ReviewItem
    startflow_4: ReviewItem
  } | null
}

export type GenerateReviewResult = {
  review: ({ title: string, description: string } & ReviewItem)[]
}

const REVIEWS_MAP: Record<keyof NonNullable<FormattedCompletionResponse['reviews']>, { title: string; description: string }> = {
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
  }
}

export async function generateReview (
  command: GenerateReviewCommand
): Promise<GenerateReviewResult> {
  const { openai, screenBuffers } = command

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
      { role: 'user', content: 'Please review the following wireflow screens.' },
      { role: 'user', content: imageContents }
    ],
    response_format: buildResponseFormat()
  })

  const formattedCompletionResponse = getFormattedCompletionResponse(completion.choices[0].message.content)

  if (!formattedCompletionResponse.reviews) {
    return { review: [] }
  }

  const result: GenerateReviewResult = {
    review: Object.entries(formattedCompletionResponse.reviews).map(([key, item]) => {
      const { title, description } = REVIEWS_MAP[key as keyof typeof REVIEWS_MAP]

      return {
        title,
        description,
        ...item
      }
    })
  }


  return result
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
              nielsen_2: reviewItemSchema,
              nielsen_4: reviewItemSchema,
              nielsen_6: reviewItemSchema,
              nielsen_8: reviewItemSchema,
              startflow_2: reviewItemSchema,
              startflow_3: reviewItemSchema,
              startflow_4: reviewItemSchema
            },
            required: [
              'nielsen_2',
              'nielsen_4',
              'nielsen_6',
              'nielsen_8',
              'startflow_2',
              'startflow_3',
              'startflow_4'
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
