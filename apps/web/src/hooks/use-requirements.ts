import { useQuery } from '@tanstack/react-query'
import { useClient } from './use-client'

export function useRequirements (boardId?: string) {
  const client = useClient()

  const getRequirements = useQuery({
    queryKey: ['getRequirements', boardId],
    queryFn: () => client.getRequirements({ boardId: boardId! }),
    enabled: Boolean(boardId)
  })

  return {
    requirements: getRequirements.data?.data ?? [],
    loading: getRequirements.isLoading,
    error: getRequirements.error,
    refetch: getRequirements.refetch
  }
}
