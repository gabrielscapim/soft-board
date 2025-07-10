import { useAuthentication, useClient, useSelectedBoard } from '@/hooks'
import { useParams } from 'react-router'
import { ChatContainer } from './components'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useState } from 'react'
import { GetMessagesResultData } from 'types/endpoints'

export function BoardWizardRoute () {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const { board } = useSelectedBoard(boardId)
  const client = useClient()
  const { authenticatedUser } = useAuthentication()
  const [sendingMessage, setSendingMessage] = useState<string | null>(null)

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      setSendingMessage(content)
      await client.sendMessage({ boardId: boardId!, content })
    },
    onError: (error: any) => toast.error(error?.response?.data?.detail ?? 'Failed to send message'),
    onSuccess: () => getMessages.refetch(),
    onSettled: () => setSendingMessage(null)
  })

  const getMessages = useQuery({
    queryKey: ['getMessages', boardId],
    queryFn: () => client.getMessages({ boardId: boardId! }),
    enabled: Boolean(boardId)
  })
  const messages = getMessages.data?.data ?? []

  return (
    <div className="flex flex-col p-2 w-full">
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
                    } as GetMessagesResultData
                  ]
                : messages
            }
            onSendMessage={content => sendMessage.mutate(content)}
          />
      )}
    </div>
  )
}
