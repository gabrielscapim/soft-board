import { useSelectedBoard, useTeam } from '@/hooks'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Skeleton } from '../ui/skeleton'

export function BoardWizardHeader () {
  const { team } = useTeam()
  const { board, loading } = useSelectedBoard()

  return (
    <header className="bg-background sticky top-0 shrink-0 border-b p-2 z-50">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${team?.slug}/boards`}>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>
                    {team?.name ? (team.name.charAt(0).toUpperCase() + (team?.name.charAt(1)?.toUpperCase() || '')) : <span className="opacity-50">T</span>}
                  </AvatarFallback>
                </Avatar>
                {team?.name ?? <span className="opacity-50">Untitled Team</span>}
              </div>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
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
