import { RequestHandler } from 'express'
import * as yup from 'yup'
import { GetSharedBoardByBoardIdResult, GetSharedBoardByBoardIdCommand } from 'types/endpoints'
import { FRONTEND_BASE_URL } from '../../constants'
import { BoardShareDatabase } from 'types/database'
import { GetApplicationDependencies } from '../../types'

type Handler = RequestHandler<unknown, GetSharedBoardByBoardIdResult, GetSharedBoardByBoardIdCommand>

const schema = yup.object().shape({
  boardId: yup.string().required()
})

export function handler (getDeps: GetApplicationDependencies): Handler {
  return async (req, res) => {
    const { boardId } = schema.validateSync(req.body, { abortEarly: false })
    const { pool } = getDeps()

    const now = new Date()

    const sharedBoard = await pool
      .SELECT<{ token: Pick<BoardShareDatabase, 'token'> }>`token`
      .FROM`board_share`
      .WHERE`board_id = ${boardId}`
      .AND`team_id = ${req.team?.teamId}`
      .AND`expire_date IS NULL OR expire_date > ${now}`
      .first()

    if (!sharedBoard) {
      res.status(200).json({ link: null })
      return
    }

    const result: GetSharedBoardByBoardIdResult = {
      link: new URL(`/share/${sharedBoard.token}`, FRONTEND_BASE_URL).toString()
    }

    res.status(200).json(result)
  }
}
