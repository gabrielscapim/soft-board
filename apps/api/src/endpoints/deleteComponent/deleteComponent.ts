import { RequestHandler } from 'express'
import { DeleteComponentCommand } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'

type Handler = RequestHandler<unknown, unknown, DeleteComponentCommand>

const schema = yup.object({
  id: yup.string().required(),
  boardId: yup.string().required()
})

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const { id, boardId } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()

    await pool
      .UPDATE`component`
      .SET({ deleted: true })
      .WHERE`id = ${id}`
      .AND`board_id = ${boardId}`
      .AND`team_id = ${teamId}`

    res.status(204).end()
  }
}
