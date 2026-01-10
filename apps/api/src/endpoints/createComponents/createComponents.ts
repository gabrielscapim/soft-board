import { RequestHandler } from 'express'
import { CreateComponentsCommand } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission, getPool } from '../../libs'
import { randomUUID } from 'crypto'

type Handler = RequestHandler<unknown, unknown, CreateComponentsCommand>

const schema = yup.object({
  boardId: yup.string().required(),
  components: yup.array().of(yup.object({
    name: yup.string().required().max(255),
    type: yup.string().required(),
    properties: yup.object().required(),
    id: yup.string().nullable().optional(),
    connectionId: yup.string().nullable().optional(),
    screenId: yup.string().nullable().optional()
  })).required()
})

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const { boardId, components } = schema.validateSync(req.body)

    assertMemberPermission(req.team!.memberRole, ['admin', 'owner'], 'Only team admins and owners can create components')

    const pool = getPool()

    await pool
      .SELECT`id`
      .FROM`board`
      .WHERE`id = ${boardId}`
      .AND`team_id = ${teamId}`
      .find({ error: `Board with id ${boardId} not found` })

    await pool.transaction(async pool => {
      // Sort to insert screens first
      components.sort((a, b) => {
        if (a.type === 'mobileScreen' && b.type !== 'mobileScreen') {
          return -1
        }
        if (a.type !== 'mobileScreen' && b.type === 'mobileScreen') {
          return 1
        }
        return 0
      })

      for (const component of components) {
        await pool
          .INSERT_INTO`component`
          .VALUES({
            id: component.id ?? randomUUID(),
            teamId,
            boardId,
            type: component.type,
            name: component.name,
            properties: component.properties,
            connectionId: component.connectionId ?? null,
            screenId: component.screenId ?? null
          })
      }
    })

    res.status(204).end()
  }
}
