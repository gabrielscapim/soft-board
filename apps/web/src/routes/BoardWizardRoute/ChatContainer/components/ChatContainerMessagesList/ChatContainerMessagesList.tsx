import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat/chat-bubble'
import { ChatMessageList } from '@/components/ui/chat/chat-message-list'
import { getAvatarFallbackName, getRootImage } from '@/helpers'
import { GetAuthenticatedUserResult, GetBoardResult, GetMessagesResultData } from 'types/endpoints'
import removeMd from 'remove-markdown'
import { BoardGenerationItem } from '../BoardGenerationItem/BoardGenerationItem'
import clsx from 'clsx'
import { BoardReviewDialog } from '../BoardReviewDialog'

export type ChatMessagesListProps = {
  board: GetBoardResult
  loading?: boolean
  authenticatedUser?: GetAuthenticatedUserResult
  messages?: GetMessagesResultData[]
  onSelectBoardGeneration?: (boardGenerationId: string) => void
}

export function ChatMessagesList (props: ChatMessagesListProps) {
  const {
    board,
    loading,
    authenticatedUser,
    messages = [],
    onSelectBoardGeneration
  } = props

  return (
    <div className="w-full overflow-y-hidden h-full flex flex-col">
      <ChatMessageList>
        {messages
          .filter(message =>
            message.content &&
            message.role !== 'system' &&
            (message.role !== 'tool' || message.boardGeneration || message.boardReview) &&
            message.toolCalled === false &&
            (message.toolCallId === null || message.boardGeneration || message.boardReview)
          )
          .map(message => {
            const isGenerationCompleted = message.boardGeneration?.status === 'completed'
            const isGenerationSelected = message.boardGeneration && board.generation?.id === message.boardGeneration?.id
            const isReviewCompleted = message.boardReview?.status === 'completed'

            return (
              <ChatBubble
                key={message.id}
                variant={message.author?.userId === authenticatedUser?.userId ? 'sent' : 'received'}
              >
                <ChatBubbleAvatar
                  fallback={getAvatarFallbackName(message.author?.name)}
                  src={message.author ? undefined : getRootImage(board.image)}
                />
                <ChatBubbleMessage
                  variant={message.author?.userId === authenticatedUser?.userId ? 'sent' : 'received'}
                  className={clsx(
                    !isGenerationSelected && isGenerationCompleted && board.step === 'wireflows' && 'cursor-pointer hover:bg-accent/50',
                    isGenerationSelected && 'border-1',
                    isReviewCompleted && 'cursor-pointer hover:bg-accent/50'
                  )}
                  onClick={() => {
                    if (isGenerationCompleted) {
                      onSelectBoardGeneration?.(message.boardGeneration!.id)
                    }
                  }}
                >
                  {message.boardGeneration && (
                    <BoardGenerationItem
                      boardGeneration={message.boardGeneration}
                    />
                  )}

                  {message.boardReview && (
                    <BoardReviewDialog
                      boardReview={message.boardReview}
                    />
                  )}

                  {!(message.boardGeneration || message.boardReview) && (
                    removeMd(message.content ?? '')
                  )}
                </ChatBubbleMessage>
              </ChatBubble>
            )
          })}

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
