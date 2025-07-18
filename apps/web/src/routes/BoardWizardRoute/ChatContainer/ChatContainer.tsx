import { GetAuthenticatedUserResult, GetBoardResult, GetMessagesResultData } from 'types/endpoints'
import { ChatContainerHeader, ChatContainerInput, ChatMessagesList } from './components'

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
    <>
      <ChatContainerHeader board={board} />
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
    </>
  )
}
