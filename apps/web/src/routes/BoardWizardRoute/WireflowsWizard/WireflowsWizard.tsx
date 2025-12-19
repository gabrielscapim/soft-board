import { useAuthentication, useBoard, useClient, useMessages } from '@/hooks'
import { ChatContainer } from '../ChatContainer'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { GetMessagesResultData } from 'types/endpoints'
import { BoardContainer } from '../BoardContainer'

export function WireflowsWizard () {
  const { board, refetch: refetchBoard } = useBoard()
  const boardId = board?.id
  const [sendingMessage, setSendingMessage] = useState<string | null>(null)
  const { authenticatedUser } = useAuthentication()
  const getMessages = useMessages(boardId)
  const client = useClient()
  const { boardController, boardState, boardManager } = useBoard()

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
      <div className="w-4/12 flex flex-col h-full border-r text-sm">
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
                      toolCalled: false
                    } as GetMessagesResultData
                  ]
                : messages
            }
            onSendMessage={content => sendMessage.mutate(content)}
            onSelectBoardGeneration={boardGenerationId => refetchBoard({ boardId: boardId!, boardGenerationId })}
          />
        )}
      </div>

      <div className="w-8/12 flex flex-col h-full">
        <BoardContainer
          board={board}
          boardState={boardState}
          boardController={boardController}
          boardManager={boardManager}
          onReturnToBoard={() => refetchBoard({ boardId: boardId! })}
        />
      </div>
    </>
  )
}
