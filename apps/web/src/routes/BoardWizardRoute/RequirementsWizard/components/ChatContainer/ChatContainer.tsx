import { GetAuthenticatedUserResult, GetBoardResult, GetMessagesResultData } from 'types/endpoints'
import { ChatMessagesList } from './ChatContainerMessagesList'
import { ChatContainerInput } from './ChatContainerInput'
import { ChatContainerHeader } from './ChatContainerHeader'

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
