import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat/chat-bubble'
import { ChatMessageList } from '@/components/ui/chat/chat-message-list'
import { getAvatarFallbackName, getRootImage } from '@/helpers'
import { GetAuthenticatedUserResult, GetBoardResult, GetMessagesResultData } from 'types/endpoints'
import removeMd from 'remove-markdown'

export type ChatMessagesListProps = {
  board: GetBoardResult
  loading?: boolean
  authenticatedUser?: GetAuthenticatedUserResult
  messages?: GetMessagesResultData[]
}

export function ChatMessagesList (props: ChatMessagesListProps) {
  const { board, loading, authenticatedUser, messages = [] } = props

  return (
    <div className="w-full overflow-y-hidden h-full flex flex-col">
      <ChatMessageList>
        {messages
          .filter(message =>
            message.content &&
            message.role !== 'system' &&
            message.role !== 'tool' &&
            message.toolCalls === null &&
            message.toolCallId === null
          )
          .map(message => (
            <ChatBubble
              key={message.id}
              variant={message.author?.userId === authenticatedUser?.userId ? 'sent' : 'received'}
            >
              <ChatBubbleAvatar
                fallback={getAvatarFallbackName(message.author?.name)}
                src={message.author ? undefined : getRootImage(board.image)}
              />
              <ChatBubbleMessage variant={message.author?.userId === authenticatedUser?.userId ? 'sent' : 'received'}>
                {message.content ? removeMd(message.content) : ''}
              </ChatBubbleMessage>
            </ChatBubble>
        ))}

        {loading && (
          <ChatBubble variant="received">
            <ChatBubbleAvatar src={getRootImage(board.image)} />
            <ChatBubbleMessage variant="received" isLoading={true} />
          </ChatBubble>
        )}
      </ChatMessageList>
    </div>
  )
}
