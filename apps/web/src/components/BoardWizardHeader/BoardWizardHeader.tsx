import { useSelectedBoard, useTeam } from '@/hooks'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Skeleton } from '../ui/skeleton'
import { useParams } from 'react-router'
import { getAvatarFallbackName } from '@/helpers'
import { Separator } from '../ui/separator'
import clsx from 'clsx'

export function BoardWizardHeader () {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const { team } = useTeam()
  const { board, loading } = useSelectedBoard(boardId)

  return (
    <header className="flex flex-row items-center bg-background sticky top-0 shrink-0 border-b p-2 z-50">
      <div className="text-sm flex flex-row items-center gap-2">
        <Avatar>
          <AvatarFallback>
            {getAvatarFallbackName(team?.name)}
          </AvatarFallback>
        </Avatar>
        <span className={clsx('truncate font-medium', !team?.name && 'opacity-50')}>
          {team?.name ?? 'Untitled Team'}
        </span>
      </div>
      <Separator
        orientation="vertical"
        className="mx-4 data-[orientation=vertical]:h-4"
      />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${team?.slug}/boards`}>
              Boards
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {loading && <Skeleton className="w-32 h-4 " />}
              {!loading && (board?.title ?? <span className="opacity-30">Untitled Board</span>)}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
