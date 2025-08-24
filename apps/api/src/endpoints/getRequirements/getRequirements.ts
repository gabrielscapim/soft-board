import { RequestHandler } from 'express'
import { GetRequirementsQuery, GetRequirementsResult, GetRequirementsResultData } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'
import { RequirementDatabase } from 'types/database'

type Handler = RequestHandler<unknown, GetRequirementsResult, GetRequirementsQuery>

const schema = yup.object({
  boardId: yup.string().trim().required('Board ID is required')
})

type RequirementRow = Pick<RequirementDatabase, 'id' | 'teamId' | 'boardId' | 'authorId' | 'title' | 'description' | 'order' | 'createDate' | 'updateDate'>
  & { author: { userId: string, name: string } | null }

export function handler (): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const { boardId } = schema.validateSync(req.body, { abortEarly: false })

    const pool = getPool()

    const board = await pool
      .SELECT`id`
      .FROM`board`
      .WHERE`id = ${boardId}`
      .AND`team_id = ${teamId}`
      .find({ error: `Board with ID "${boardId}" not found in team with ID "${teamId}"` })

    const requirements = await pool
      .SELECT<RequirementRow>`
        requirement.id,
        requirement.team_id AS "teamId",
        requirement.board_id AS "boardId",
        CASE
          WHEN "user".id IS NULL THEN NULL
          ELSE json_build_object(
            'userId', "user".id,
            'name', "user".name
          )
        END AS author,
        requirement.title,
        requirement.description,
        requirement."order",
        requirement.create_date AS "createDate",
        requirement.update_date AS "updateDate"`
      .FROM`requirement`
      .LEFT_JOIN`"user" ON "user".id = requirement.author_id`
      .WHERE`requirement.board_id = ${board.id}`
      .AND`requirement.team_id = ${teamId}`
      .ORDER_BY`requirement."order" ASC`
      .list()

    const data = requirements.map<GetRequirementsResultData>(requirement => ({
      id: requirement.id,
      teamId: requirement.teamId,
      boardId: requirement.boardId,
      author: requirement.author ? {
        userId: requirement.author.userId,
        name: requirement.author.name
      } : null,
      title: requirement.title,
      description: requirement.description,
      order: requirement.order,
      createDate: requirement.createDate.toISOString(),
      updateDate: requirement.updateDate.toISOString()
    }))

    res.status(200).json({ data })
  }
}
