import { GetBoardsResultData } from 'types/endpoints'
import { BoardCard } from '../BoardCard'
import { Skeleton } from '@/components/ui/skeleton'

export type BoardsGridProps = {
  hasPermission?: boolean
  loading?: boolean
  boards?: GetBoardsResultData[]
  handleEdit?: (board: GetBoardsResultData) => void
  handleDelete?: (board: GetBoardsResultData) => void
}

export function BoardsGrid (props: BoardsGridProps) {
  const { hasPermission, loading, boards = [], handleEdit, handleDelete } = props

  return (
    <div className="grid gap-8 w-full lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1">
      {!loading && boards.map(board => (
        <BoardCard
          key={board.id}
          hasPermission={hasPermission}
          board={board}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}

      {loading && new Array(9).fill(null).map((_, index) => (
        <div key={index} className="w-full">
          <Skeleton className="h-36 w-full" />
        </div>
      ))}
    </div>
  )
}
