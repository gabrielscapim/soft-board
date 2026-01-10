import { RequestHandler } from 'express'
import * as yup from 'yup'
import { randomUUID } from 'crypto'
import { AddGenerationToBoardCommand } from 'types/endpoints'
import { ComponentDatabase } from 'types/database'
import { assertMemberPermission, getPool } from '../../libs'
import { calculateOffsets } from './_methods'

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
    const {
      boardId,
      boardGenerationId
    } = schema.validateSync(req.body, { abortEarly: false })

    assertMemberPermission(req.team!.memberRole, ['admin', 'owner'], 'Only team admins and owners can add generations to boards')

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

    const existingComponents = await pool
      .SELECT<ComponentRow>`properties`
      .FROM`component`
      .WHERE`board_id = ${boardId}`
      .AND`team_id = ${teamId}`
      .AND`board_generation_id IS NULL`
      .list()

    const generationComponents = await pool
      .SELECT<ComponentRow>`
        id,
        name,
        type,
        properties,
        connection_id,
        screen_id
      `
      .FROM`component`
      .WHERE`board_generation_id = ${boardGenerationId}`
      .AND`board_id = ${boardId}`
      .AND`team_id = ${teamId}`
      .list()

    const { offsetX, offsetY } = calculateOffsets(existingComponents, generationComponents)

    const componentsMap = new Map<string, string>(
      generationComponents.map(component => [
        component.id,
        randomUUID()
      ])
    )

    // Sort components to ensure screens are created before their child components
    generationComponents.sort((a, b) => {
      if (a.type === 'mobileScreen' && b.type !== 'mobileScreen') return -1
      if (a.type !== 'mobileScreen' && b.type === 'mobileScreen') return 1

      return 0
    })

    await pool.transaction(async pool => {
      for (const component of generationComponents) {
        const newId = componentsMap.get(component.id)!
        const properties = { ...component.properties }

        if (typeof properties.x === 'number') properties.x += offsetX
        if (typeof properties.y === 'number') properties.y += offsetY

        await pool
          .INSERT_INTO`component`
          .VALUES({
            id: newId,
            team_id: teamId,
            board_id: boardId,
            board_generation_id: null,
            name: component.name,
            type: component.type,
            properties,
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
