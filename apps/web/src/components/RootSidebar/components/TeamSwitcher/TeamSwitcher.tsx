import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { getAvatarFallbackName } from '@/helpers'
import { ChevronsUpDown, Plus } from 'lucide-react'
import { GetTeamsResultData } from 'types/endpoints'

export type TeamSwitcherProps = {
  teams: GetTeamsResultData[]
  loading?: boolean
  activeTeam?: GetTeamsResultData
  handleTeamChange?: (team: GetTeamsResultData) => void
  handleCreateTeam?: () => void
}

export function TeamSwitcher (props: TeamSwitcherProps) {
  const { teams, loading, activeTeam, handleTeamChange, handleCreateTeam } = props

  const { isMobile } = useSidebar()

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar>
                <AvatarFallback>
                  {getAvatarFallbackName(activeTeam.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>

            {!loading && teams.map(team => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => handleTeamChange?.(team)}
                className="gap-2 p-2"
              >
                {team.name}
              </DropdownMenuItem>
            ))}

            {loading && new Array(5).fill(null).map((_, index) => (
              <DropdownMenuItem
                key={index}
                className="p-1"
                disabled
              >
                <Skeleton className="h-4 w-full" />
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="gap-2 p-2"
              disabled={loading}
              onClick={() => handleCreateTeam?.()}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
