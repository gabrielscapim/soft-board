import { RequestHandler } from 'express'
import { UpdateComponentsCommand } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'

type Handler = RequestHandler<unknown, unknown, UpdateComponentsCommand>

const schema = yup.object({
  boardId: yup.string().required(),
  components: yup.array().of(yup.object({
    id: yup.string().required(),
    name: yup.string().nullable().optional().max(255),
    properties: yup.object().nullable().optional().default({}),
    connectionId: yup.string().nullable().optional(),
    screenId: yup.string().nullable().optional()
  })).required()
})

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const { boardId, components } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()
    const now = new Date()

    await pool.transaction(async pool => {
      for (const component of components) {
        const { id, name, properties, connectionId, screenId } = component

        const values: Record<string, any> = {
          updateDate: now
        }

        if (name !== undefined) values.name = name
        if (properties !== undefined) values.properties = properties
        if (connectionId !== undefined) values.connectionId = connectionId
        if (screenId !== undefined) values.screenId = screenId

        await pool
          .UPDATE`component`
          .SET(values)
          .WHERE`id = ${id}`
          .AND`board_id = ${boardId}`
          .AND`team_id = ${teamId}`
      }
    })

    res.status(204).end()
  }
}
