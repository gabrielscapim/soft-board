import { GetAuthenticatedUserResult, GetBoardResult, GetMessagesResultData } from 'types/endpoints'
import { ChatContainerHeader } from './ChatContainerHeader'
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
    <div className="flex flex-col h-full">
      <ChatContainerHeader board={board} />
      <div className="flex-1 overflow-y-auto">
        <ChatMessagesList
          board={board}
          loading={loading}
          authenticatedUser={authenticatedUser}
          messages={messages}
        />
      </div>
      <ChatContainerInput
        loading={loading}
        onSendMessage={onSendMessage}
      />
    </div>
  )
}
