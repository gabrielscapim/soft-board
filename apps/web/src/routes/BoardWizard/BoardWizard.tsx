import { useClient, useTeam } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

export function BoardWizard () {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const client = useClient()
  const getBoard = useQuery({
    queryKey: ['getBoard', boardId],
    queryFn: async () => client.getBoard({ boardId: boardId! }),
    enabled: Boolean(boardId)
  })
  const board = getBoard.data
  const team = useTeam()

  return (
    <>
      <pre>{JSON.stringify(team, null, 2)}</pre>
      <pre>{JSON.stringify(board, null, 2)}</pre>
    </>
  )
}
