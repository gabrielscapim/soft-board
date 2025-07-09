import { RequestHandler } from 'express'
import { BoardDatabase } from 'types/database'
import { GetBoardsQuery, GetBoardsResult, GetBoardsResultData } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'

type Handler = RequestHandler<unknown, GetBoardsResult, GetBoardsQuery>

type BoardRow =
  Pick<BoardDatabase, 'id' | 'title' | 'createDate' | 'updateDate' | 'image'>
  & { author: { id: string; name: string } | null }

const schema = yup.object({
  q: yup.string().optional().nullable().default(null)
})

export function handler (): Handler {
  return async (req, res) => {
    const { q } = schema.validateSync(req.body, { abortEarly: false })
    const teamId = req.team!.teamId

    const pool = getPool()

    const boards = await pool
      .SELECT<BoardRow>`
        board.id,
        board.title,
        board.create_date,
        board.update_date,
        board.image,
        COALESCE(JSON_BUILD_OBJECT(
          'id', "user".id,
          'name', "user".name
        ), NULL) AS "author"`
      .FROM`board`
      .WHERE`team_id = ${teamId}`
      .if(Boolean(q), q => q.AND`board.title ILIKE ${`%${q}%`}`)
      .LEFT_JOIN`"user" ON "user".id = board.author_id`
      .ORDER_BY`update_date DESC`
      .list()

    const data: GetBoardsResultData[] = boards.map(board => ({
      id: board.id,
      teamId,
      createDate: board.createDate.toISOString(),
      updateDate: board.updateDate.toISOString(),
      image: board.image,
      title: board.title,
      author: board.author
    }))

    res.status(200).json({ data })
  }
}
