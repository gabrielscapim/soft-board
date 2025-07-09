import { RequestHandler } from 'express'
import { UpdateTeamCommand, UpdateTeamResult } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'
import slugify from 'slugify'
import { Conflict } from 'http-errors'

type Handler = RequestHandler<undefined, UpdateTeamResult, UpdateTeamCommand>

const schema = yup.object({
  name: yup.string().trim().required('Name is required').max(100, 'Name must be at most 100 characters long')
})

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const { name } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()
    const slug = slugify(name, { lower: true, strict: true })

    const existingTeam = await pool
      .SELECT`id`
      .FROM`team`
      .WHERE`slug = ${slug}`
      .AND`id != ${teamId}`
      .first()

    if (existingTeam) {
      throw new Conflict(`A team with the slug "${slug}" already exists`)
    }

    await pool
      .UPDATE`team`
      .SET({
        name,
        slug,
        updateDate: new Date()
      })
      .WHERE`id = ${teamId}`

    res.status(200).json({ slug })
  }
}
