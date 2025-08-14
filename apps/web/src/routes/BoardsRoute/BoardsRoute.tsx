import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { BoardsGrid, DeleteBoardDialog, EditBoardDialog } from './components'
import { useClient, useMemberRole } from '@/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useState } from 'react'
import { GetBoardsResultData } from 'types/endpoints'

export function BoardsRoute () {
  const client = useClient()
  const memberRole = useMemberRole()

  const [selectedBoard, setSelectedBoard] = useState<(GetBoardsResultData & { to: 'edit' | 'delete' }) | null>(null)
  const getBoards = useQuery({
    queryKey: ['getBoards'],
    queryFn: async () => await client.getBoards({ })
  })
  const createBoard = useMutation({
    mutationFn: () => client.createBoard({}),
    onSuccess: () => {
      getBoards.refetch()
      toast.success('Board created successfully')
    },
    onError: () => toast.error('Failed to create board')
  })
  const deleteBoard = useMutation({
    mutationFn: () => client.deleteBoard({ id: selectedBoard!.id }),
    onSuccess: () => {
      getBoards.refetch()
      setSelectedBoard(null)
      toast.success('Board deleted successfully')
    },
    onError: () => toast.error('Failed to delete board')
  })
  const editBoard = useMutation({
    mutationFn: (title: string) => client.updateBoard({ id: selectedBoard!.id, title }),
    onSuccess: () => {
      getBoards.refetch()
      setSelectedBoard(null)
      toast.success('Board updated successfully')
    },
    onError: () => toast.error('Failed to update board')
  })
  const boards = getBoards.data?.data ?? []

  return (
    <div className="py-4 w-full px-8">
      <div className="mb-6 flex flex-row justify-between items-center">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-semibold">Team boards</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage boards for your team.
          </p>
        </div>

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

      <BoardsGrid
        hasPermission={['owner', 'admin'].includes(memberRole ?? '')}
        loading={getBoards.isPending}
        boards={boards}
        handleEdit={board => setSelectedBoard({ ...board, to: 'edit' })}
        handleDelete={board => setSelectedBoard({ ...board, to: 'delete' })}
      />

      {getBoards.error && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-destructive mb-1">
            Failed to load boards
          </h2>
          <p className="text-xs text-muted-foreground">
            There was an error fetching the boards
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            disabled={getBoards.isPending}
            onClick={() => getBoards.refetch()}
          >
            Retry
          </Button>
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
            disabled={createBoard.isPending}
            onClick={() => createBoard.mutate()}
          >
            <PlusIcon />
            New board
          </Button>
        </div>
      )}

      {selectedBoard?.to === 'delete' && (
        <DeleteBoardDialog
          open={selectedBoard?.to === 'delete'}
          isMutating={deleteBoard.isPending}
          onCancel={() => setSelectedBoard(null)}
          onConfirm={() => deleteBoard.mutate()}
        />
      )}

      {selectedBoard?.to === 'edit' && (
        <EditBoardDialog
          board={selectedBoard ?? null}
          open={selectedBoard?.to === 'edit'}
          onOpenChange={open => setSelectedBoard(open ? selectedBoard : null)}
          onSave={title => editBoard.mutate(title)}
          onCancel={() => setSelectedBoard(null)}
        />
      )}
    </div>
  )
}
