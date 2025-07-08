import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { BoardsGrid } from './components'
import { useClient } from '@/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export function TeamBoardsRoute () {
  const client = useClient()

  const getBoards = useQuery({
    queryKey: ['getBoards'],
    queryFn: async () => await client.getBoards({ })
  })
  const createBoard = useMutation({
    mutationFn: () => client.createBoard({}),
    onSuccess: () => {
      getBoards.refetch()
      toast.success('Board created successfully!')
    },
    onError: () => toast.error('Failed to create board')
  })
  const boards = getBoards.data?.data ?? []

  return (
    <div className="p-4 w-full">
      <div className="mb-6 flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold">Team boards</h1>
        <Button
          variant="outline"
          size="sm"
          disabled={createBoard.isPending}
          onClick={() => createBoard.mutate()}
        >
          <PlusIcon />
          New board
        </Button>
      </div>

      <BoardsGrid loading={getBoards.isPending} boards={boards} />

      {getBoards.error && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-destructive mb-1">
            Failed to load boards
          </h2>
          <p className="text-xs text-muted-foreground">
            There was an error fetching the boards
          </p>
        </div>
      )}

      {!getBoards.isPending && !getBoards.isError && boards.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-1">
            No boards found
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Create a new board to get started
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => createBoard.mutate()}
          >
            <PlusIcon />
            New board
          </Button>
        </div>
      )}
    </div>
  )
}
