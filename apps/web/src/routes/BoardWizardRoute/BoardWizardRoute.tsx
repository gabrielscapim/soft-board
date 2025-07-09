import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat/chat-bubble'
import { ChatMessageList } from '@/components/ui/chat/chat-message-list'
import { useSelectedBoard } from '@/hooks'
import { useParams } from 'react-router'

export function BoardWizardRoute () {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const { board } = useSelectedBoard(boardId)

  return (
    <div>
      <pre>
        {JSON.stringify(board, null, 2)}
      </pre>
      <ChatMessageList>
        <ChatBubble variant='sent'>
          <ChatBubbleAvatar fallback='US' />
          <ChatBubbleMessage variant='sent'>
            Hello, how has your day been? I hope you are doing well.
          </ChatBubbleMessage>
        </ChatBubble>

        <ChatBubble variant='received'>
          <ChatBubbleAvatar fallback='AI' />
          <ChatBubbleMessage variant='received'>
            Hi, I am doing well, thank you for asking. How can I help you today?
          </ChatBubbleMessage>
        </ChatBubble>

        <ChatBubble variant='received'>
          <ChatBubbleAvatar fallback='AI' />
          <ChatBubbleMessage isLoading />
        </ChatBubble>
      </ChatMessageList>
    </div>
  )
}
