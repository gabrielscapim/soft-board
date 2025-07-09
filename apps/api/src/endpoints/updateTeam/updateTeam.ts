import { RequestHandler } from 'express'
import { UpdateTeamCommand } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'
import slugify from 'slugify'

type Handler = RequestHandler<unknown, unknown, UpdateTeamCommand>

const schema = yup.object({
  name: yup.string().trim().required('Name is required').max(100, 'Name must be at most 100 characters long')
})

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const { name } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()
    const slug = slugify(name, { lower: true, strict: true })

    await pool
      .UPDATE`team`
      .SET({
        name,
        slug,
        updateDate: new Date()
      })
      .WHERE`id = ${teamId}`

    res.status(204).end()
  }
}
