import { RequestHandler } from 'express'
import { UpdateComponentsCommand } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission } from '../../libs'
import { GetApplicationDependencies } from '../../types'

type Handler = RequestHandler<unknown, unknown, UpdateComponentsCommand>

const schema = yup.object({
  boardId: yup.string().required(),
  components: yup.array().of(yup.object({
    id: yup.string().required(),
    name: yup.string().nullable().optional().max(255).default(null),
    properties: yup.object().nullable().optional().default({}),
    connectionId: yup.string().nullable().optional().default(null),
    screenId: yup.string().nullable().optional().default(null)
  })).required()
})

export function handler (getDeps: GetApplicationDependencies): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const { boardId, components } = schema.validateSync(req.body, { abortEarly: false })

    assertMemberPermission(req.team!.memberRole, ['admin', 'owner'], 'Only team admins and owners can update components')

    const { pool } = getDeps()
    const now = new Date()

    await pool.transaction(async pool => {
      for (const component of components) {
        const { id, name, properties, connectionId, screenId } = component

        const values: Record<string, any> = {
          updateDate: now,
          name,
          properties,
          connectionId,
          screenId
        }

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
