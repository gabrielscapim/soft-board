import { useAuthentication, useMessages, useSelectedBoard } from '@/hooks'
import { useParams } from 'react-router'
import { ChatContainer } from '../ChatContainer'
import { BoardContainer } from './components'

export function WireflowsWizard () {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const { board } = useSelectedBoard(boardId)
  const { authenticatedUser } = useAuthentication()
  const getMessages = useMessages(boardId)

  return (
    <>
      <div className="w-3/12 flex flex-col h-full border-r text-sm">
        {board && (
          <ChatContainer
            board={board}
            authenticatedUser={authenticatedUser}
            messages={getMessages.messages}
          />
        )}
      </div>

      <div className="w-9/12 bg-card flex flex-col h-full">
        <BoardContainer />
      </div>
    </>
  )
}
