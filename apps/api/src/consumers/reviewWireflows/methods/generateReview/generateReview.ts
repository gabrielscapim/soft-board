import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { ChatCompletionContentPartImage, ChatCompletionCreateParamsNonStreaming } from 'openai/resources.js'
import { logger } from '../../../../libs'

type GenerateReviewCommand = {
  openai: OpenAI
  screenBuffers: Buffer<ArrayBufferLike>[]
}

type ReviewItem = {
  applicable: boolean
  explanation: string
  score?: number
  suggestions?: string[]
  not_applicable_reason?: string
}

type GenerateReviewResult = {
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

  const response = getFormattedResponse(completion.choices[0].message.content)

  return response
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
      not_applicable_reason: {
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

function getFormattedResponse (content: string | null): GenerateReviewResult {
  if (content === null) {
    return { reviews: null }
  }

  try {
    return JSON.parse(content) as GenerateReviewResult
  } catch (error) {
    logger.error({ error, content }, 'Failed to parse review wireflows response')

    return { reviews: null }
  }
}
