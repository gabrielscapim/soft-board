import { RequestHandler } from 'express'
import * as yup from 'yup'
import { ShareBoardCommand, ShareBoardResult } from 'types/endpoints'
import { assertMemberPermission, getPool } from '../../libs'
import { FRONTEND_BASE_URL } from '../../constants'
import { randomBytes } from 'crypto'

type Handler = RequestHandler<unknown, ShareBoardResult, ShareBoardCommand>

const schema = yup.object({
  boardId: yup.string().required(),
  expireDate: yup.string().nullable().optional().default(null)
})

export function handler (): Handler {
  return async (req, res) => {
    const { boardId, expireDate } = await schema.validate(req.body, { abortEarly: false })
    const team = req.team!

    assertMemberPermission(team.memberRole, ['admin', 'owner'], 'Only team admins and owners can share boards')

    const pool = getPool()

    const board = await pool
      .SELECT`id`
      .FROM`board`
      .WHERE`id = ${boardId}`
      .AND`team_id = ${team.teamId}`
      .find({ error: `Board with id ${boardId} not found` })

    const currentShare = await pool
      .SELECT`id, token`
      .FROM`board_share`
      .WHERE`board_id = ${board.id}`
      .first()

    if (currentShare) {
      const result: ShareBoardResult = {
        link: new URL(`/share/${currentShare.token}`, FRONTEND_BASE_URL).toString()
      }

      res.status(201).json(result)
      return
    }

    const token = randomBytes(24).toString('hex')

    await pool
      .INSERT_INTO`board_share`
      .VALUES({
        team_id: team.teamId,
        board_id: board.id,
        token,
        expire_date: expireDate ? new Date(expireDate) : null
      })

    const result: ShareBoardResult = {
      link: new URL(`/share/${token}`, FRONTEND_BASE_URL).toString()
    }

    res.status(201).json(result)
  }
}
