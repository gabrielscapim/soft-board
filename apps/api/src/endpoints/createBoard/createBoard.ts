import { RequestHandler } from 'express'
import { BoardDatabase } from 'types/database'
import { CreateBoardCommand, CreateBoardResult } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'

type Handler = RequestHandler<unknown, CreateBoardResult, CreateBoardCommand>

type BoardRow = Pick<BoardDatabase, 'id'>

const schema = yup.object({
  title: yup.string().nullable().optional().default(null)
})

// TO-DO - Improve this to accept images from the client
const IMAGE_IDS = [1, 2, 3, 4, 5, 6, 7, 8]

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const userId = req.auth!.userId
    const { title } = schema.validateSync(req.body)

    const pool = getPool()

    const { rows: [created] } = await pool
      .INSERT_INTO`board`
      .VALUES({
        teamId,
        title,
        authorId: userId,
        image: IMAGE_IDS[Math.floor(Math.random() * IMAGE_IDS.length)].toString()
      })
      .RETURNING<BoardRow>`id`

    res.status(201).json({ id: created.id, teamId })
  }
}
