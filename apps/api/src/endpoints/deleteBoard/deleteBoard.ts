import { RequestHandler } from 'express'
import { DeleteBoardCommand } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'

type Handler = RequestHandler<unknown, unknown, DeleteBoardCommand>

const schema = yup.object({
  id: yup.string().required()
})

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const { id } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()

    await pool
      .DELETE_FROM`board`
      .WHERE`id = ${id}`
      .AND`team_id = ${teamId}`

    res.status(204).end()
  }
}
