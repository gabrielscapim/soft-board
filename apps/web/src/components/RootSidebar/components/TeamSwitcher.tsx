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
import { ChevronsUpDown, Plus } from 'lucide-react'
import { GetTeamsResultData } from 'types/endpoints'

export type TeamSwitcherProps = {
  teams: GetTeamsResultData[]
  activeTeam?: GetTeamsResultData
  handleTeamChange?: (team: GetTeamsResultData) => void
}

export function TeamSwitcher (props: TeamSwitcherProps) {
  const { teams, activeTeam, handleTeamChange } = props

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
              <TeamAvatar name={activeTeam.name} />
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

            {teams.map(team => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => handleTeamChange?.(team)}
                className="gap-2 p-2"
              >
                {team.name}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 p-2">
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

function TeamAvatar ({ name }: { name: string }) {
  return (
    <Avatar className="bg-red-50">
      <AvatarFallback>
        {name.charAt(0).toUpperCase() + (name.charAt(1)?.toUpperCase() || '')}
      </AvatarFallback>
    </Avatar>
  )
}
