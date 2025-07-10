import { useQuery } from '@tanstack/react-query'
import { useClient } from './use-client'

export function useSelectedBoard (boardId?: string) {
  const client = useClient()

  const getBoard = useQuery({
    queryKey: ['getBoard', boardId],
    queryFn: () => client.getBoard({ boardId: boardId! }),
    enabled: Boolean(boardId)
  })

  return {
    board: getBoard.data,
    loading: getBoard.isLoading,
    error: getBoard.error
  }
}
