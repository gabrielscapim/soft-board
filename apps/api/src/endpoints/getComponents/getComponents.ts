import { RequestHandler } from 'express'
import { ComponentDatabase } from 'types/database'
import { GetComponentsQuery, GetComponentsResult, GetComponentsResultData } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'

type Handler = RequestHandler<unknown, GetComponentsResult, GetComponentsQuery>

type ComponentRow = Pick<ComponentDatabase, 'id' | 'name' | 'type' | 'properties' | 'connectionId' | 'screenId' | 'createDate' | 'updateDate'>

const schema = yup.object({
  boardId: yup.string().required()
})

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const { boardId } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()

    const components = await pool
      .SELECT<ComponentRow>`
        id,
        name,
        type,
        properties,
        connection_id,
        screen_id,
        create_date,
        update_date`
      .FROM`component`
      .WHERE`component.board_id = ${boardId}`
      .AND`component.team_id = ${teamId}`
      .ORDER_BY`component.update_date DESC`
      .list()

    const data = components.map<GetComponentsResultData>(component => ({
      id: component.id,
      name: component.name,
      type: component.type,
      properties: component.properties,
      connectionId: component.connectionId,
      screenId: component.screenId,
      createDate: component.createDate.toISOString(),
      updateDate: component.updateDate.toISOString()
    }))

    res.status(200).json({ data })
  }
}
