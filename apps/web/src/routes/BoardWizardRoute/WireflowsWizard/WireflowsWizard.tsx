import { useAuthentication, useBoard, useClient, useMemberRole, useMessages } from '@/hooks'
import { ChatContainer } from '../ChatContainer'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { GetMessagesResultData } from 'types/endpoints'
import { BoardContainer } from '../BoardContainer'
import { TUTORIALS_ANCHORS } from '@/tutorials'
import { useTranslation } from 'react-i18next'
import { Client } from '@/client/client'

export function WireflowsWizard () {
  const { board, refetchWithQuery } = useBoard()
  const boardId = board?.id
  const [sendingMessage, setSendingMessage] = useState<string | null>(null)
  const { authenticatedUser } = useAuthentication()
  const getMessages = useMessages(boardId)
  const client = useClient()
  const { boardController, boardState, boardManager } = useBoard()
  const memberRole = useMemberRole()
  const { t } = useTranslation('routes.boardWizard')
  const hasPermission = memberRole !== 'member'

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      setSendingMessage(content)
      return await client.sendMessage({ boardId: boardId!, content })
    },
    onError: (error: any) => {
      const code = Client.getErrorCode(error)
      toast.error(code ? t(`errors.${code}`, { ns: 'common' }) : t('toast.sendMessageError'))
    },
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
            hasPermission={memberRole !== 'member'}
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
            onSelectBoardGeneration={boardGenerationId => refetchWithQuery({ boardId: boardId!, boardGenerationId })}
          />
        )}
      </div>

      <div
        data-tutorial={TUTORIALS_ANCHORS.BoardWizardWireflowsContainer}
        className="w-8/12 flex flex-col h-full"
      >
        <BoardContainer
          hasPermission={hasPermission}
          board={board}
          boardState={boardState}
          boardController={boardController}
          boardManager={boardManager}
          onReturnToBoard={() => refetchWithQuery({ boardId: boardId! })}
        />
      </div>
    </>
  )
}
