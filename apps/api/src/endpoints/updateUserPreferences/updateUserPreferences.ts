import { RequestHandler } from 'express'
import { UpdateUserPreferencesCommand } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'

type Handler = RequestHandler<unknown, unknown, UpdateUserPreferencesCommand>

const schema = yup.object({
  language: yup.string().optional(),
  acceptedTutorial: yup.boolean().optional()
})

export function handler (): Handler {
  return async (req, res) => {
    const { language, acceptedTutorial } = schema.validateSync(req.body, { abortEarly: false })

    const userId = req.auth!.userId

    const pool = getPool()

    await pool
      .UPDATE`user_preferences`
      .SET({
        ...(language !== undefined ? { language } : {}),
        ...(acceptedTutorial !== undefined ? { acceptedTutorial } : {}),
        updateDate: new Date()
      })
      .WHERE`user_id = ${userId}`

    res.status(204).end()
  }
}

