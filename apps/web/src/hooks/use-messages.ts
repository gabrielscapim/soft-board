import { useQuery } from '@tanstack/react-query'
import { useClient } from './use-client'
import { useContext, useEffect } from 'react'
import { SocketContext } from '@/contexts'
import { AgentCreatedWireflow, AgentReviewedBoard } from 'realtime-events'

export function useMessages (boardId?: string) {
  const client = useClient()
  const socket = useContext(SocketContext)

  const getMessages = useQuery({
    queryKey: ['getMessages', boardId],
    queryFn: () => client.getMessages({ boardId: boardId! }),
    enabled: Boolean(boardId)
  })

  useEffect(() => {
    if (!socket) return

    const handler = (data: AgentReviewedBoard | AgentCreatedWireflow) => {
      if (data.boardId === boardId) {
        getMessages.refetch()
      }
    }

    socket.on('agentReviewedBoard', handler)
    socket.on('agentCreatedWireflow', handler)

    return () => {
      socket.off('agentReviewedBoard', handler)
      socket.off('agentCreatedWireflow', handler)
    }
  }, [socket, boardId, getMessages])

  return {
    messages: getMessages.data?.data ?? [],
    loading: getMessages.isLoading,
    error: getMessages.error,
    refetch: getMessages.refetch
  }
}
