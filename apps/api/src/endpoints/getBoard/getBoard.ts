import { RequestHandler } from 'express'
import { BoardDatabase, BoardGenerationDatabase, ComponentDatabase, TeamDatabase } from 'types/database'
import { GetBoardQuery, GetBoardResult, GetBoardResultGeneration } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'

type Handler = RequestHandler<unknown, GetBoardResult, GetBoardQuery>

type BoardRow = Pick<
  BoardDatabase,
  | 'id'
  | 'title'
  | 'createDate'
  | 'updateDate'
  | 'step'
  | 'image'
  | 'status'
> & { team: Pick<TeamDatabase, 'id' | 'slug' | 'name'> }

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
  | 'boardGenerationId'
>

type BoardGenerationRow = Pick<BoardGenerationDatabase, 'id' | 'generationDate'>

const schema = yup.object({
  boardId: yup.string().required(),
  boardGenerationId: yup.string().optional().nullable().default(null)
})

export function handler (): Handler {
  return async (req, res) => {
    const { boardId, boardGenerationId } = schema.validateSync(req.body, { abortEarly: false })
    const teamId = req.team!.teamId

    const pool = getPool()

    const board = await pool
      .SELECT<BoardRow>`
        board.id,
        board.title,
        board.create_date,
        board.update_date,
        board.step,
        board.status,
        board.image,
        JSON_BUILD_OBJECT(
          'id', team.id,
          'slug', team.slug,
          'name', team.name
        ) AS team`
      .FROM`board`
      .JOIN`team ON team.id = board.team_id`
      .WHERE`board.id = ${boardId}`
      .AND`board.team_id = ${teamId}`
      .find({ error: `Board with id ${boardId} does not exist` })

    const components = await pool
      .SELECT<ComponentRow>`
        id,
        name,
        type,
        properties,
        connection_id,
        screen_id,
        create_date,
        update_date,
        board_generation_id`
      .FROM`component`
      .WHERE`component.board_id = ${boardId}`
      .AND`component.team_id = ${teamId}`
      .AND`component.deleted IS FALSE`
      .if(!boardGenerationId, q => q.AND`component.board_generation_id IS NULL`)
      .if(Boolean(boardGenerationId), q => q.AND`component.board_generation_id = ${boardGenerationId}`)
      .ORDER_BY`component.update_date DESC`
      .list()

    let generation: GetBoardResultGeneration | null = null

    if (boardGenerationId) {
      const boardGeneration = await pool
        .SELECT<BoardGenerationRow>`id, generation_date`
        .FROM`board_generation`
        .WHERE`id = ${boardGenerationId}`
        .AND`generation_date IS NOT NULL`
        .find({ error: `Board generation with id ${boardGenerationId} does not exist for board with id ${boardId}` })

      generation = {
        id: boardGeneration.id,
        generationDate: boardGeneration.generationDate!.toISOString()
      }
    }

    const result: GetBoardResult = {
      id: board.id,
      title: board.title,
      step: board.step as GetBoardResult['step'],
      status: board.status,
      image: board.image,
      createDate: board.createDate.toISOString(),
      updateDate: board.updateDate.toISOString(),
      team: {
        id: board.team.id,
        slug: board.team.slug,
        name: board.team.name
      },
      components: components.map(component => ({
        id: component.id,
        name: component.name,
        type: component.type,
        properties: component.properties,
        connectionId: component.connectionId,
        boardGenerationId: component.boardGenerationId,
        screenId: component.screenId,
        createDate: component.createDate.toISOString(),
        updateDate: component.updateDate.toISOString()
      })),
      generation
    }

    res.status(200).json(result)
  }
}
