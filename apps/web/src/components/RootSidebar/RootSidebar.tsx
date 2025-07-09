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
import { CreateTeamDialog, NavUser, TeamSwitcher } from './components'
import { Link, useNavigate } from 'react-router'
import { useAuthentication, useClient, useTeam } from '@/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useState } from 'react'

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
  const [createTeamDialogOpen, setCreateTeamDialogOpen] = useState(false)
  const { authenticatedUser, setAuthenticatedUser } = useAuthentication()
  const client = useClient()
  const activeTeam = useTeam()
  const navigate = useNavigate()

  const getTeams = useQuery({
    queryKey: ['getTeams', authenticatedUser?.userId],
    queryFn: () => client.getTeams()
  })
  const createTeam = useMutation({
    mutationFn: (name: string) => client.createTeam({ name }),
    onSuccess: (data) => {
      toast.success('Team created successfully')
      setCreateTeamDialogOpen(false)
      navigate(`/${data.slug}`)
    },
    onError: (error: any) => toast.error(error?.response?.data?.detail ?? 'Failed to create team')
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
          handleCreateTeam={() => setCreateTeamDialogOpen(true)}
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

      {createTeamDialogOpen && (
        <CreateTeamDialog
          open={createTeamDialogOpen}
          onOpenChange={setCreateTeamDialogOpen}
          onCancel={() => setCreateTeamDialogOpen(false)}
          onSave={(name) => createTeam.mutate(name)}
        />
      )}
      <SidebarRail />
    </Sidebar>
  )
}
