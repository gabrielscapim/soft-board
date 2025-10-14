import { RequestHandler } from 'express'
import { AddGenerationToBoardCommand } from 'types/endpoints'
import * as yup from 'yup'
import { randomUUID } from 'crypto'
import { getPool } from '../../libs'
import { ComponentDatabase } from 'types/database'

type Handler = RequestHandler<unknown, unknown, AddGenerationToBoardCommand>

type ComponentRow = Pick<
  ComponentDatabase,
  | 'id'
  | 'name'
  | 'type'
  | 'properties'
  | 'connectionId'
  | 'screenId'
>

const schema = yup.object({
  boardId: yup.string().required(),
  boardGenerationId: yup.string().required()
})

export function handler (): Handler {
  return async (req, res) => {
    const { boardId, boardGenerationId } = schema.validateSync(req.body, { abortEarly: false })
    const teamId = req.team!.teamId

    const pool = getPool()

    await pool
      .SELECT`id`
      .FROM`board`
      .WHERE`id = ${boardId}`
      .AND`team_id = ${teamId}`
      .find({ error: `Board with id ${boardId} not found` })

    await pool
      .SELECT`id`
      .FROM`board_generation`
      .WHERE`id = ${boardGenerationId}`
      .AND`board_id = ${boardId}`
      .AND`team_id = ${teamId}`
      .find({ error: `Board generation with id ${boardGenerationId} not found` })

    const components = await pool
      .SELECT<ComponentRow>`
        id,
        name,
        type,
        properties,
        connection_id,
        screen_id`
      .FROM`component`
      .WHERE`board_generation_id = ${boardGenerationId}`
      .AND`team_id = ${teamId}`
      .AND`board_id = ${boardId}`
      .list()

    const componentsMap = new Map(components.map(component => [component.id, randomUUID()]))

    // Sort screens first so that when we insert components that reference screens
    components.sort((a, b) => {
      if (a.type === 'mobileScreen' && b.type !== 'mobileScreen') return -1
      if (a.type !== 'mobileScreen' && b.type === 'mobileScreen') return 1

      return 0
    })

    await pool.transaction(async pool => {
      for (const component of components) {
        const newId = componentsMap.get(component.id)!

        await pool
          .INSERT_INTO`component`
          .VALUES({
            id: newId,
            team_id: teamId,
            board_id: boardId,
            name: component.name,
            type: component.type,
            properties: component.properties,
            connection_id: component.connectionId
              ? componentsMap.get(component.connectionId) ?? null
              : null,
            screen_id: component.screenId
              ? componentsMap.get(component.screenId) ?? null
              : null
          })
      }
    })

    res.status(204).end()
  }
}
