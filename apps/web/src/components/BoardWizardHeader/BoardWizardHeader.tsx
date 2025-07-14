import { useSelectedBoard } from '@/hooks'
import { Link, useParams } from 'react-router'
import { Button } from '../ui/button'
import { ChevronLeft } from 'lucide-react'

export function BoardWizardHeader () {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const { board } = useSelectedBoard(boardId)

  return (
    <header className="flex flex-row justify-between items-center sticky top-0 shrink-0 p-2 z-50 bg-muted">
      <Link
        to={`/${board?.team.slug ?? ''}/boards`}
        className="flex items-center gap-2 font-medium"
      >
        <Button variant="outline">
          <ChevronLeft />
          Back
        </Button>
      </Link>
    </header>
  )
}
