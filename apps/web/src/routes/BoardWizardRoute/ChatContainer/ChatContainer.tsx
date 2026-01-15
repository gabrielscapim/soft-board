import { GetAuthenticatedUserResult, GetBoardResult, GetMessagesResultData } from 'types/endpoints'
import {
  ChatContainerHeader,
  ChatMessagesList,
  ChatContainerInput
} from './components'
import { TUTORIALS_ANCHORS } from '@/tutorials'

export type ChatContainerProps = {
  board: GetBoardResult
  hasPermission?: boolean
  authenticatedUser?: GetAuthenticatedUserResult
  loading?: boolean
  messages?: GetMessagesResultData[]
  onSendMessage?: (content: string) => void
  onSelectBoardGeneration?: (boardGenerationId: string) => void
}

export function ChatContainer (props: ChatContainerProps) {
  const {
    board,
    hasPermission,
    authenticatedUser,
    loading,
    messages,
    onSendMessage,
    onSelectBoardGeneration
  } = props

  return (
    <div
      data-tutorial={TUTORIALS_ANCHORS.BoardWizardChatContainer}
      className="flex flex-col h-full"
    >
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
        hasPermission={hasPermission}
        loading={loading}
        onSendMessage={onSendMessage}
      />
    </div>
  )
}
