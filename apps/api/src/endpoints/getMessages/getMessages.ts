import { RequestHandler } from 'express'
import { BoardGenerationDatabase, MessageDatabase } from 'types/database'
import { GetMessagesQuery, GetMessagesResult, GetMessagesResultData } from 'types/endpoints'
import * as yup from 'yup'
import { getPool } from '../../libs'

type Handler = RequestHandler<unknown, GetMessagesResult, GetMessagesQuery>

type MessageRow =
  Pick<MessageDatabase, 'id' | 'boardId' | 'content' | 'role' | 'toolCallId' | 'toolCalls' | 'sendDate' | 'createDate' | 'updateDate'>
  & { author: { userId: string; name: string } | null }

type BoardGenerationRow = Pick<BoardGenerationDatabase, 'id' | 'toolCallId' | 'status' | 'generationDate' | 'createDate' | 'updateDate'>

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

    const boardGenerations = await pool
      .SELECT<BoardGenerationRow>`
        id,
        tool_call_id,
        status,
        generation_date,
        create_date,
        update_date`
      .FROM`board_generation`
      .WHERE`board_id = ${boardId}`
      .ORDER_BY`create_date`
      .list()

    const boardGenerationsByToolCallId = new Map<string, BoardGenerationRow>(
      boardGenerations.map(boardGeneration => [boardGeneration.toolCallId, boardGeneration])
    )

    const data = messages.map<GetMessagesResultData>(message => {
      const boardGeneration = message.toolCallId ? boardGenerationsByToolCallId.get(message.toolCallId) : null

      return {
        id: message.id,
        boardId: message.boardId,
        content: message.content,
        role: message.role,
        toolCallId: message.toolCallId,
        toolCalled: message.toolCalls !== null,
        author: message.author ? {
          userId: message.author.userId,
          name: message.author.name
        } : null,
        boardGeneration: boardGeneration ? {
          id: boardGeneration.id,
          status: boardGeneration.status,
          generationDate: boardGeneration.generationDate ? boardGeneration.generationDate.toISOString() : null,
          createDate: boardGeneration.createDate.toISOString(),
          updateDate: boardGeneration.updateDate.toISOString()
        } : null,
        sendDate: message.sendDate.toISOString(),
        createDate: message.createDate.toISOString(),
        updateDate: message.updateDate.toISOString()
      }
    })

    res.status(200).json({ data })
  }
}
