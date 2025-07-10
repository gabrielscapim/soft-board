import { useSelectedBoard } from '@/hooks'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Link, useParams } from 'react-router'
import { getRootImage } from '@/helpers'
import { Button } from '../ui/button'
import { ChevronLeft } from 'lucide-react'
import { Tooltip, TooltipContent } from '../ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { Skeleton } from '../ui/skeleton'
import { Separator } from '../ui/separator'

export function BoardWizardHeader () {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const { board, loading } = useSelectedBoard(boardId)

  return (
    <header className="flex flex-row items-center bg-background sticky top-0 shrink-0 border-b p-2 z-50 gap-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={`/${board?.team.slug ?? ''}/boards`} className="flex items-center">
            <Button variant="outline" size="icon" className="size-7">
              <ChevronLeft />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Back to boards</p>
        </TooltipContent>
      </Tooltip>
      <Separator
        orientation="vertical"
        className="mx-1 data-[orientation=vertical]:h-4"
      />
      <div className="text-sm flex flex-row items-center gap-2">
        <Avatar>
          <AvatarImage src={getRootImage(board?.image)} />
        </Avatar>
        {loading && <Skeleton className="w-32 h-4 " />}
        {!loading && (board?.title ?? <span className="opacity-30">Untitled Board</span>)}
      </div>
    </header>
  )
}
