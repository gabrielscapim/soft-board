import { RequestHandler } from 'express'
import { BoardDatabase } from 'types/database'
import { CreateBoardCommand, CreateBoardResult } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission, getPool } from '../../libs'
import { BadRequest } from 'http-errors'

type Handler = RequestHandler<unknown, CreateBoardResult, CreateBoardCommand>

type BoardRow = Pick<BoardDatabase, 'id'>

const schema = yup.object({
  title: yup.string().nullable().optional().default(null)
})

// TO-DO - Improve this to accept images from the client
const IMAGE_IDS = [1, 2, 3, 4, 5, 6, 7, 8]

const MAX_BOARD_COUNT = 20

const ASSISTANT_MESSAGE = 'Hello! I’m your assistant specialized in the StartFlow method, here to help software startups design MVPs quickly, visually, and with a strong focus on user experience.'

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const userId = req.auth!.userId
    const { title } = schema.validateSync(req.body)

    assertMemberPermission(req.team!.memberRole, ['admin', 'owner'], 'Only team admins and owners can create boards')

    const pool = getPool()

    const count = await pool
      .SELECT`id`
      .FROM`board`
      .WHERE`team_id = ${teamId}`
      .count()

    if (count >= MAX_BOARD_COUNT) {
      throw new BadRequest(`Maximum of ${MAX_BOARD_COUNT} boards per team reached`)
    }

    const created = await pool.transaction(async pool => {
      const { rows: [created] } = await pool
        .INSERT_INTO`board`
        .VALUES({
          teamId,
          title,
          authorId: userId,
          image: IMAGE_IDS[Math.floor(Math.random() * IMAGE_IDS.length)].toString()
        })
        .RETURNING<BoardRow>`id`

      await pool
        .INSERT_INTO`message`
        .VALUES({
          teamId,
          boardId: created.id,
          content: ASSISTANT_MESSAGE,
          role: 'assistant'
        })

      return created
    })

    res.status(201).json({ id: created.id, teamId })
  }
}
