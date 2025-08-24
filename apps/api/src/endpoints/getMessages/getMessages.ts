import { RequestHandler } from 'express'
import { MessageDatabase } from 'types/database'
import { GetMessagesQuery, GetMessagesResult, GetMessagesResultData, GetMessagesResultToolCall } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'

type Handler = RequestHandler<unknown, GetMessagesResult, GetMessagesQuery>

type MessageRow =
  Pick<MessageDatabase, 'id' | 'boardId' | 'content' | 'role' | 'toolCallId' | 'toolCalls' | 'sendDate' | 'createDate' | 'updateDate'>
  & { author: { userId: string; name: string } | null }

const schema = yup.object({
  boardId: yup.string().trim().required()
})

export function handler (): Handler {
  return async (req, res) => {
    const { boardId } = schema.validateSync(req.body, { abortEarly: false })
    const teamId = req.team!.teamId

    const pool = getPool()

    const messages = await pool
      .SELECT<MessageRow>`
        message.id,
        message.board_id AS "boardId",
        message.content,
        message.role,
        message.tool_call_id AS "toolCallId",
        message.tool_calls AS "toolCalls",
        message.send_date AS "sendDate",
        message.create_date AS "createDate",
        message.update_date AS "updateDate",
        CASE
          WHEN "user".id IS NULL THEN NULL
          ELSE json_build_object(
            'userId', "user".id,
            'name', "user".name
          )
        END AS author`
      .FROM`message`
      .LEFT_JOIN`"user" ON "user".id = message.author_id`
      .WHERE`message.board_id = ${boardId}`
      .AND`message.team_id = ${teamId}`
      .AND`message.type = 'text'`
      .ORDER_BY`message.send_date ASC`
      .list()

    const data = messages.map<GetMessagesResultData>(message => ({
      id: message.id,
      boardId: message.boardId,
      content: message.content,
      role: message.role,
      toolCallId: message.toolCallId,
      toolCalls: message.toolCalls as GetMessagesResultToolCall[] | null,
      author: message.author ? {
        userId: message.author.userId,
        name: message.author.name
      } : null,
      sendDate: message.sendDate.toISOString(),
      createDate: message.createDate.toISOString(),
      updateDate: message.updateDate.toISOString()
    }))

    res.status(200).json({ data })
  }
}
