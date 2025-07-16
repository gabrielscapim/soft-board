import { useQuery } from '@tanstack/react-query'
import { useClient } from './use-client'

export function useMessages (boardId?: string) {
  const client = useClient()

  const getMessages = useQuery({
    queryKey: ['getMessages', boardId],
    queryFn: () => client.getMessages({ boardId: boardId! }),
    enabled: Boolean(boardId)
  })

  return {
    messages: getMessages.data?.data ?? [],
    loading: getMessages.isLoading,
    error: getMessages.error,
    refetch: getMessages.refetch
  }
}
