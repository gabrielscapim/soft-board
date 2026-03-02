import { RequestHandler } from 'express'
import { DeleteComponentsCommand } from 'types/endpoints'
import * as yup from 'yup'
import { assertMemberPermission } from '../../libs'
import { GetApplicationDependencies } from '../../types'

type Handler = RequestHandler<unknown, unknown, DeleteComponentsCommand>

const schema = yup.object({
  boardId: yup.string().required(),
  componentIds: yup.array().of(yup.string().required()).required()
})

export function handler (getDeps: GetApplicationDependencies): Handler {
  return async (req, res) => {
    const teamId = req.team!.teamId
    const { boardId, componentIds } = schema.validateSync(req.body, { abortEarly: false })
    const { pool } = getDeps()

    assertMemberPermission(req.team!.memberRole, ['admin', 'owner'], 'Only team admins and owners can delete components')

    await pool.transaction(async client => {
      // Delete the child components first (e.g., components inside a screen)
      await client
        .DELETE_FROM`component`
        .WHERE`screen_id = ANY(${componentIds})`
        .AND`board_id = ${boardId}`
        .AND`team_id = ${teamId}`

      // Set the connectionId to null for components connected to the deleted components
      await client
        .UPDATE`component`
        .SET({ connectionId: null })
        .WHERE`connection_id = ANY(${componentIds})`
        .AND`board_id = ${boardId}`
        .AND`team_id = ${teamId}`

      // Then delete the specified components
      await client
        .DELETE_FROM`component`
        .WHERE`id = ANY(${componentIds})`
        .AND`board_id = ${boardId}`
        .AND`team_id = ${teamId}`
    })


    res.status(204).end()
  }
}
