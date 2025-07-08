import { RequestHandler } from 'express'
import { GetAuthenticatedUserResult } from 'types/endpoints/getAuthenticatedUser'
import { UserDatabase } from 'types/database'
import { getPool } from '../../libs'

export const auth = false

type Handler = RequestHandler<unknown, GetAuthenticatedUserResult>

type UserRow = Pick<UserDatabase, 'id' | 'name'>

export function handler (): Handler {
  return async (req, res) => {
    const { auth } = req

    if (!auth) {
      res.status(200).json(null)
      return
    }

    const pool = getPool()

    const user = await pool
      .SELECT<UserRow>`id, name`
      .FROM`"user"`
      .WHERE`id = ${auth.userId}`
      .find({ error: 'User not found' })

    const result: GetAuthenticatedUserResult = {
      userId: user.id,
      name: user.name
    }

    res.status(200).json(result)
  }
}
