import { RequestHandler } from 'express'
import { UpdateUserPreferencesCommand } from 'types/endpoints'
import * as yup from 'yup'
import { GetApplicationDependencies } from '../../types'

type Handler = RequestHandler<unknown, unknown, UpdateUserPreferencesCommand>

const schema = yup.object({
  language: yup.string().optional()
})

export function handler (getDeps: GetApplicationDependencies): Handler {
  return async (req, res) => {
    const { language } = schema.validateSync(req.body, { abortEarly: false })

    const userId = req.auth!.userId

    const { pool } = getDeps()

    await pool.transaction(async pool => {
      const updated = await pool
        .UPDATE`user_preferences`
        .SET({
          ...(language !== undefined ? { language } : {})
        })
        .WHERE`user_id = ${userId}`

      if (updated.rowCount === 0) {
        await pool
          .INSERT_INTO`user_preferences`
          .VALUES({
            user_id: userId,
            ...(language !== undefined ? { language } : {})
          })
      }
    })

    res.status(204).end()
  }
}

