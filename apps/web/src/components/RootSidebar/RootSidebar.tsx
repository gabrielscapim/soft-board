import { Settings, SquareMousePointer, UsersRound } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '../ui/sidebar'
import { NavUser, TeamSwitcher } from './components'
import { Link, useNavigate } from 'react-router'
import { useAuthentication, useClient, useTeam } from '@/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

const items = [
  {
    title: 'Boards',
    url: 'boards',
    icon: SquareMousePointer
  },
  {
    title: 'Members',
    url: 'members',
    icon: UsersRound,
  },
  {
    title: 'Settings',
    url: 'settings',
    icon: Settings
  }
]

export function RootSidebar () {
  const { authenticatedUser, setAuthenticatedUser } = useAuthentication()
  const client = useClient()
  const activeTeam = useTeam()
  const navigate = useNavigate()

  const getTeams = useQuery({
    queryKey: ['getTeams', authenticatedUser?.userId],
    queryFn: () => client.getTeams()
  })
  const signOut = useMutation({
    mutationFn: () => client.signOut(),
    onSuccess: () => setAuthenticatedUser(null),
    onError: () => toast.error('Failed to sign out')
  })

  const teams = getTeams.data?.data ?? []

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher
          teams={teams}
          activeTeam={activeTeam.team}
          handleTeamChange={team => {
            if (team.slug !== activeTeam.team?.name) {
              navigate(`/${team.slug}`)
            }
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Team</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {authenticatedUser && (
        <SidebarFooter>
          <NavUser
            user={{
              name: authenticatedUser.name,
              email: authenticatedUser.email
            }}
            handleSignOut={() => signOut.mutate()}
          />
        </SidebarFooter>
      )}

      <SidebarRail />
    </Sidebar>
  )
}
