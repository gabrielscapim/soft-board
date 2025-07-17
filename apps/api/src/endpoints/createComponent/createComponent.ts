import { RequestHandler } from 'express'
import { CreateComponentCommand } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'
import { randomUUID } from 'crypto'

type Handler = RequestHandler<unknown, unknown, CreateComponentCommand>

const schema = yup.object({
  boardId: yup.string().required(),
  type: yup.string().required(),
  properties: yup.object().required(),
  id: yup.string().nullable().optional(),
  connectionId: yup.string().nullable().optional(),
  screenId: yup.string().nullable().optional()
})

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const {
      boardId,
      type,
      properties,
      id = randomUUID(),
      connectionId = null,
      screenId = null
    } = schema.validateSync(req.body)

    const pool = getPool()

    await pool
      .SELECT`id`
      .FROM`board`
      .WHERE`id = ${boardId}`
      .AND`team_id = ${teamId}`
      .find({ error: `Board with id ${boardId} not found` })

    await pool
      .INSERT_INTO`component`
      .VALUES({
        id,
        teamId,
        boardId,
        type,
        properties,
        connectionId,
        screenId
      })

    res.status(204).end()
  }
}
