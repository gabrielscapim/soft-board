import { useAuthentication, useClient, useMessages, useSelectedBoard } from '@/hooks'
import { useParams } from 'react-router'
import { ChatContainer } from '../ChatContainer'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { GetMessagesResultData } from 'types/endpoints'
import { BoardContainer } from '../BoardContainer'

export function WireflowsWizard () {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const { board } = useSelectedBoard(boardId)
  const [sendingMessage, setSendingMessage] = useState<string | null>(null)
  const { authenticatedUser } = useAuthentication()
  const getMessages = useMessages(boardId)
  const client = useClient()

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      setSendingMessage(content)
      return await client.sendMessage({ boardId: boardId!, content })
    },
    onError: (error: any) =>
      toast.error(error?.response?.data?.detail ?? 'Failed to send message'),
    onSuccess: () => getMessages.refetch(),
    onSettled: () => setSendingMessage(null)
  })

  const messages = getMessages.messages

  return (
    <>
      <div className="w-3/12 flex flex-col h-full border-r text-sm">
        {board && (
          <ChatContainer
            board={board}
            authenticatedUser={authenticatedUser}
            loading={sendMessage.isPending}
            messages={
              sendingMessage
                ? [
                    ...messages,
                    {
                      id: 'preview',
                      content: sendingMessage,
                      author: authenticatedUser,
                      role: 'user',
                      toolCallId: null,
                      toolCalls: null
                    } as GetMessagesResultData
                  ]
                : messages
            }
            onSendMessage={content => sendMessage.mutate(content)}
          />
        )}
      </div>

      <div className="w-9/12 flex flex-col h-full">
        <BoardContainer />
      </div>
    </>
  )
}
