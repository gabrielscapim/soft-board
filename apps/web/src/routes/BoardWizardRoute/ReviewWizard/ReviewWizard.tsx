import { useAuthentication, useBoard, useClient, useMemberRole, useMessages } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { ChatContainer } from '../ChatContainer'
import { GetMessagesResultData } from 'types/endpoints'
import { BoardContainer } from '../BoardContainer'

export function ReviewWizard () {
  const { board } = useBoard()
  const boardId = board?.id
  const [sendingMessage, setSendingMessage] = useState<string | null>(null)
  const { authenticatedUser } = useAuthentication()
  const getMessages = useMessages(boardId)
  const client = useClient()
  const { boardController, boardManager, boardState } = useBoard()
  const memberRole = useMemberRole()

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      setSendingMessage(content)
      return await client.sendMessage({ boardId: boardId!, content })
    },
    onError: (error: any) => toast.error(error?.response?.data?.detail ?? 'Failed to send message'),
    onSuccess: () => getMessages.refetch(),
    onSettled: () => setSendingMessage(null)
  })

  const messages = getMessages.messages

  return (
    <>
      <div className="w-4/12 flex flex-col h-full border-r text-sm">
        {board && (
          <ChatContainer
            hasPermission={memberRole !== 'member'}
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
          />
        )}
      </div>

      <div className="w-8/12 flex flex-col h-full">
        <BoardContainer
          hasPermission={memberRole !== 'member'}
          board={board}
          enableDraggable={false}
          enableKeyboardShortcuts={false}
          enableResizing={false}
          enableSelection={false}
          boardState={boardState}
          boardController={boardController}
          boardManager={boardManager}
        />
      </div>
    </>
  )
}
