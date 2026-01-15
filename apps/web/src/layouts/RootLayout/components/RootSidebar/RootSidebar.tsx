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
} from '@/components'
import { ConfirmLogOutDialog, CreateTeamDialog, LeaveTeamDialog, NavUser, TeamSwitcher } from './components'
import { Link, useNavigate } from 'react-router'
import { useAuthentication, useClient, useMemberRole, useTeam } from '@/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useState } from 'react'
import { TUTORIALS_ANCHORS } from '@/tutorials'

const items = [
  {
    title: 'Boards',
    url: 'boards',
    icon: SquareMousePointer,
    'data-tutorial': TUTORIALS_ANCHORS.RootSidebarBoardsItem
  },
  {
    title: 'Members',
    url: 'members',
    icon: UsersRound,
    'data-tutorial': TUTORIALS_ANCHORS.RootSidebarMembersItem
  },
  {
    title: 'Settings',
    url: 'settings',
    icon: Settings,
    'data-tutorial': TUTORIALS_ANCHORS.RootSidebarSettingsItem
  }
]

export function RootSidebar () {
  const [createTeamDialogOpen, setCreateTeamDialogOpen] = useState(false)
  const [leaveTeamDialogOpen, setLeaveTeamDialogOpen] = useState(false)
  const [logOutDialogOpen, setLogOutDialogOpen] = useState(false)
  const { authenticatedUser, setAuthenticatedUser } = useAuthentication()
  const client = useClient()
  const activeTeam = useTeam()
  const role = useMemberRole()
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
    onSuccess: () => {
      setAuthenticatedUser(null)
      window.location.reload()
    },
    onError: () => toast.error('Failed to sign out')
  })
  const leaveTeam = useMutation({
    mutationFn: () => client.leaveTeam(),
    onSuccess: () => {
      setLeaveTeamDialogOpen(false)
      toast.success('You have left the team')
      getTeams.refetch()
      window.location.reload()
    },
    onError: (error: any) => toast.error(error?.response?.data?.detail ?? 'Failed to leave team')
  })

  const teams = getTeams.data?.data ?? []

  return (
    <Sidebar
      collapsible="icon"
      data-tutorial={TUTORIALS_ANCHORS.RootSidebar}
    >
      <SidebarHeader>
        <TeamSwitcher
          teams={teams}
          loading={getTeams.isLoading}
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
                <SidebarMenuItem
                  key={item.title}
                  data-tutorial={item['data-tutorial']}
                >
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
            isOwner={role === 'owner'}
            handleSignOut={() => setLogOutDialogOpen(true)}
            handleLeaveTeam={() => setLeaveTeamDialogOpen(true)}
          />
        </SidebarFooter>
      )}

      {createTeamDialogOpen && (
        <CreateTeamDialog
          open={createTeamDialogOpen}
          isMutating={createTeam.isPending}
          onCancel={() => setCreateTeamDialogOpen(false)}
          onConfirm={(name) => createTeam.mutate(name)}
        />
      )}

      {leaveTeamDialogOpen && (
        <LeaveTeamDialog
          team={activeTeam.team}
          open={leaveTeamDialogOpen}
          isMutating={leaveTeam.isPending}
          onCancel={() => setLeaveTeamDialogOpen(false)}
          onConfirm={() => leaveTeam.mutate()}
        />
      )}

      {logOutDialogOpen && (
        <ConfirmLogOutDialog
          open={logOutDialogOpen}
          onCancel={() => setLogOutDialogOpen(false)}
          onConfirm={() => signOut.mutate()}
        />
      )}
      <SidebarRail />
    </Sidebar>
  )
}
