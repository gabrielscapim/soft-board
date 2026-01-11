import { useQuery } from '@tanstack/react-query'
import { useClient } from './use-client'
import { useContext, useEffect } from 'react'
import { SocketContext } from '@/contexts'
import { AgentUpdatedRequirements } from 'realtime-events'

export function useRequirements (boardId?: string) {
  const client = useClient()
  const socket = useContext(SocketContext)

  const getRequirements = useQuery({
    queryKey: ['getRequirements', boardId],
    queryFn: () => client.getRequirements({ boardId: boardId! }),
    enabled: Boolean(boardId)
  })

  useEffect(() => {
    if (!socket) return

    const handler = (data: AgentUpdatedRequirements) => {
      if (data.boardId === boardId) {
        getRequirements.refetch()
      }
    }

    socket.on('agentUpdatedRequirements', handler)

    return () => {
      socket.off('agentUpdatedRequirements', handler)
    }
  }, [socket, boardId, getRequirements])

  return {
    requirements: getRequirements.data?.data ?? [],
    loading: getRequirements.isLoading,
    error: getRequirements.error,
    refetch: getRequirements.refetch
  }
}
