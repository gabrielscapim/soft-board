import { useAuthentication, useBoard, useClient, useMessages } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { ChatContainer } from '../ChatContainer'
import { GetMessagesResultData } from 'types/endpoints'
import { Board, BoardZoomController, useScale } from '@/components'
import { MAX_SCALE, MIN_SCALE } from '@/helpers'
import { WireframeModeLink } from '../../../components/WireframeModeLink'

export function ReviewWizard () {
  const { board } = useBoard()
  const boardId = board?.id
  const [sendingMessage, setSendingMessage] = useState<string | null>(null)
  const { authenticatedUser } = useAuthentication()
  const getMessages = useMessages(boardId)
  const client = useClient()
  const { boardController, boardManager, boardState } = useBoard()
  const scale = useScale(boardState)

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
      <div className="w-6/12 flex flex-col h-full border-r text-sm">
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

      <div className="w-6/12 flex flex-col h-full">
        <div className="bg-background sticky top-0 shrink-0 p-3 h-15 flex justify-between items-center w-full border-b-1">
          <WireframeModeLink
            to="wireframe"
          />
          <BoardZoomController
            scale={scale}
            onZoomIn={() => boardController.onChangeBoardScale({ scale: Math.min(scale + 0.25, MAX_SCALE) })}
            onZoomOut={() => boardController.onChangeBoardScale({ scale: Math.max(scale - 0.25, MIN_SCALE) })}
          />
        </div>

        <Board
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
