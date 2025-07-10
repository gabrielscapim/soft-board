import { GetAuthenticatedUserResult, GetBoardResult, GetMessagesResultData } from 'types/endpoints'
import { Card } from '@/components/ui/card'
import { ChatMessagesList } from './ChatContainerMessagesList'
import { ChatContainerInput } from './ChatContainerInput'

export type ChatContainerProps = {
  board: GetBoardResult
  authenticatedUser?: GetAuthenticatedUserResult
  loading?: boolean
  messages?: GetMessagesResultData[]
  onSendMessage?: (content: string) => void
}

export function ChatContainer (props: ChatContainerProps) {
  const { board, authenticatedUser, loading, messages, onSendMessage } = props

  return (
    <Card className="h-full w-2/6 text-sm gap-0 py-0 rounded-none border-t-0">
      <ChatMessagesList
        board={board}
        loading={loading}
        authenticatedUser={authenticatedUser}
        messages={messages}
      />
      <ChatContainerInput
        loading={loading}
        onSendMessage={onSendMessage}
      />
    </Card>
  )
}
