import { RequestHandler } from 'express'
import { BoardDatabase, TeamDatabase } from 'types/database'
import { GetBoardQuery, GetBoardResult } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'

type Handler = RequestHandler<unknown, GetBoardResult, GetBoardQuery>

type BoardRow =
  Pick<BoardDatabase, 'id' | 'title' | 'createDate' | 'updateDate' | 'step' | 'image'>
  & { team: Pick<TeamDatabase, 'id' | 'slug' | 'name'> }

const schema = yup.object({
  boardId: yup.string().required()
})

export function handler (): Handler {
  return async (req, res) => {
    const { boardId } = schema.validateSync(req.body, { abortEarly: false })
    const teamId = req.team!.teamId

    const pool = getPool()

    const board = await pool
      .SELECT<BoardRow>`
        board.id,
        board.title,
        board.create_date,
        board.update_date,
        board.step,
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

    const result: GetBoardResult = {
      id: board.id,
      title: board.title,
      step: board.step,
      image: board.image,
      createDate: board.createDate.toISOString(),
      updateDate: board.updateDate.toISOString(),
      team: {
        id: board.team.id,
        slug: board.team.slug,
        name: board.team.name
      }
    }

    res.status(200).json(result)
  }
}
