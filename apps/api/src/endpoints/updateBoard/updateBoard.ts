import { RequestHandler } from 'express'
import { UpdateBoardCommand } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'

type Handler = RequestHandler<unknown, unknown, UpdateBoardCommand>

const schema = yup.object({
  id: yup.string().required(),
  title: yup.string().nullable().optional().default(null)
})

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const { id, title } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()

    await pool
      .UPDATE`board`
      .SET({
        title,
        updateDate: new Date()
      })
      .WHERE`id = ${id}`
      .AND`team_id = ${teamId}`

    res.status(204).end()
  }
}
