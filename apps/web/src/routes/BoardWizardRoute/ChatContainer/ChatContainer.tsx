import { GetAuthenticatedUserResult, GetBoardResult, GetMessagesResultData } from 'types/endpoints'
import {
  ChatContainerHeader,
  ChatMessagesList,
  ChatContainerInput
} from './components'

export type ChatContainerProps = {
  board: GetBoardResult
  authenticatedUser?: GetAuthenticatedUserResult
  loading?: boolean
  messages?: GetMessagesResultData[]
  onSendMessage?: (content: string) => void
  onSelectBoardGeneration?: (boardGenerationId: string) => void
}

export function ChatContainer (props: ChatContainerProps) {
  const {
    board,
    authenticatedUser,
    loading,
    messages,
    onSendMessage,
    onSelectBoardGeneration
  } = props

  return (
    <div className="flex flex-col h-full">
      <ChatContainerHeader board={board} />
      <div className="flex-1 overflow-y-auto">
        <ChatMessagesList
          board={board}
          loading={loading}
          authenticatedUser={authenticatedUser}
          messages={messages}
          onSelectBoardGeneration={onSelectBoardGeneration}
        />
      </div>
      <ChatContainerInput
        loading={loading}
        onSendMessage={onSendMessage}
      />
    </div>
  )
}
