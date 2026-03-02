import { RequestHandler } from 'express'
import { MemberDatabase } from 'types/database'
import { GetMembersQuery, GetMembersResult, GetMembersResultData } from 'types/endpoints'
import * as yup from 'yup'
import { GetApplicationDependencies } from '../../types'

type Handler = RequestHandler<GetMembersQuery, GetMembersResult>

type MemberRow = Pick<MemberDatabase, 'id' | 'role' | 'createDate' | 'updateDate'>
  & { user: { id: string, name: string, email: string } }

const DEFAULT_PAGE_NUMBER = 0
const DEFAULT_PAGE_SIZE = 200

const schema = yup.object({
  query: yup.string().optional(),
  pageNumber: yup.number().optional().default(DEFAULT_PAGE_NUMBER),
  pageSize: yup.number().optional().default(DEFAULT_PAGE_SIZE)
})

export function handler (getDeps: GetApplicationDependencies): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const { query, pageNumber, pageSize } = schema.validateSync(req.body, { abortEarly: false })
    const { pool } = getDeps()

    const members = await pool
      .SELECT<MemberRow>`
        member.id,
        member.role,
        member.create_date,
        member.update_date,
        JSON_BUILD_OBJECT(
          'id', "user".id,
          'name', "user".name,
          'email', "user".email
        ) AS user`
      .FROM`member`
      .WHERE`member.team_id = ${teamId}`
      .if(Boolean(query), q => q.AND`"user".name ILIKE ${`%${query}%`} OR "user".email ILIKE ${`%${query}%`}`)
      .JOIN`"user" ON "user".id = member.user_id`
      .ORDER_BY`"user".name ASC`
      .page(pageNumber, pageSize)

    const data = members.rows.map<GetMembersResultData>(member => ({
      id: member.id,
      role: member.role,
      createDate: member.createDate.toISOString(),
      updateDate: member.updateDate.toISOString(),
      user: {
        id: member.user.id,
        name: member.user.name,
        email: member.user.email
      }
    }))

    const result: GetMembersResult = {
      data,
      totalSize: members.count,
      pageSize,
      pageNumber
    }

    res.status(200).json(result)
  }
}
