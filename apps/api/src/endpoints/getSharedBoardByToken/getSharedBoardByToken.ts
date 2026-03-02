import { RequestHandler } from 'express'
import { GetSharedBoardByTokenCommand, GetSharedBoardByTokenResult } from 'types/endpoints'
import * as yup from 'yup'
import { createAppHttpError } from '../../libs'
import { BoardDatabase, BoardShareDatabase, ComponentDatabase, RequirementDatabase } from 'types/database'
import { GetApplicationDependencies } from '../../types'

type Handler = RequestHandler<unknown, GetSharedBoardByTokenResult, GetSharedBoardByTokenCommand>

export const auth = false

const schema = yup.object().shape({
  token: yup.string().required()
})

type SharedBoardRow = Pick<BoardShareDatabase, 'boardId' | 'expireDate'>

type BoardRow = Pick<BoardDatabase, 'id' | 'title' | 'step' | 'image'>

type ComponentRow = Pick<
  ComponentDatabase,
  | 'id'
  | 'name'
  | 'type'
  | 'properties'
  | 'connectionId'
  | 'screenId'
  | 'createDate'
  | 'updateDate'
>

type RequirementRow = Pick<RequirementDatabase, 'id' | 'title' | 'description' | 'order'>

export function handler (getDeps: GetApplicationDependencies): Handler {
  return async (req, res) => {
    const { token } = schema.validateSync(req.body, { abortEarly: false })
    const { pool } = getDeps()

    const sharedBoard = await pool
      .SELECT`board_id, expire_date`
      .FROM`board_share`
      .WHERE`token = ${token}`
      .find<SharedBoardRow>({ error: 'Shared board link not found' })

    const now = new Date()

    if (sharedBoard.expireDate && sharedBoard.expireDate < now) {
      throw createAppHttpError(410, 'SHARED_BOARD_EXPIRED', 'The shared board link has expired')
    }

    const board = await pool
      .SELECT`id, title, step, image`
      .FROM`board`
      .WHERE`id = ${sharedBoard.boardId}`
      .find<BoardRow>({ error: 'Board not found' })

    if (board.step === 'init') {
      throw createAppHttpError(400, 'SHARED_BOARD_EXPIRED', 'This board cannot be shared because it is not yet in a shareable state')
    }

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
      .WHERE`component.board_id = ${board.id}`
      .AND`board_generation_id IS NULL`
      .ORDER_BY`component.update_date DESC`
      .list()

    const requirements = await pool
      .SELECT<RequirementRow>`
        id,
        title,
        description`
      .FROM`requirement`
      .WHERE`requirement.board_id = ${board.id}`
      .ORDER_BY`requirement."order" ASC`
      .list()

    const result: GetSharedBoardByTokenResult = {
      board: {
        id: board.id,
        title: board.title,
        image: board.image,
        step: board.step as GetSharedBoardByTokenResult['board']['step'],
        components: components.map(component => ({
          id: component.id,
          name: component.name,
          type: component.type,
          properties: component.properties,
          connectionId: component.connectionId,
          screenId: component.screenId,
          createDate: component.createDate.toISOString(),
          updateDate: component.updateDate.toISOString()
        })),
        requirements: requirements.map(requirement => ({
          id: requirement.id,
          title: requirement.title,
          description: requirement.description
        }))
      }
    }

    res.status(200).json(result)
  }
}
