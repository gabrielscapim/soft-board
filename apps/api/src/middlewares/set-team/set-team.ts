import { RequestHandler } from 'express'
import { getPool } from '../../libs'
import { Forbidden } from 'http-errors'

export const setTeam: RequestHandler = async (req, res, next) => {
  // If the request has no authentication data, skip setting the team. The require-auth middleware will handle this
  if (!req.auth) {
    next()
    return
  }

  const slug = req.headers['team-slug']

  // If the slug is not a string, skip setting the team
  if (typeof slug !== 'string') {
    next()
    return
  }

  const userId = req.auth.userId
  const pool = getPool()

  const team = await pool
    .SELECT`team.id`
    .FROM`member`
    .JOIN`team ON team.id = member.team_id`
    .WHERE`member.user_id = ${userId}`
    .AND`team.slug = ${slug}`
    .first()

  if (!team) {
    throw new Forbidden(`User is not a member of the team with slug ${slug}`)
  }

  req.team = {
    teamId: team.id
  }
  res.set('team-slug', slug)

  next()
}
