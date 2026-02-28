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
import { useTranslation } from 'react-i18next'
import { Client } from '@/client'

const items = [
  {
    title: 'common:boards',
    url: 'boards',
    icon: SquareMousePointer,
    'data-tutorial': TUTORIALS_ANCHORS.RootSidebarBoardsItem
  },
  {
    title: 'common:members',
    url: 'members',
    icon: UsersRound,
    'data-tutorial': TUTORIALS_ANCHORS.RootSidebarMembersItem
  },
  {
    title: 'common:settings',
    url: 'settings',
    icon: Settings,
    'data-tutorial': TUTORIALS_ANCHORS.RootSidebarSettingsItem
  }
]

export function RootSidebar () {
  const [createTeamDialogOpen, setCreateTeamDialogOpen] = useState(false)
  const [leaveTeamDialogOpen, setLeaveTeamDialogOpen] = useState(false)
  const [logOutDialogOpen, setLogOutDialogOpen] = useState(false)
  const { authenticatedUser, setAuthenticatedUser, refetch: refetchAuthenticatedUser } = useAuthentication()
  const client = useClient()
  const activeTeam = useTeam()
  const role = useMemberRole()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation('layouts.rootLayout')

  const getTeams = useQuery({
    queryKey: ['getTeams', authenticatedUser?.userId],
    queryFn: () => client.getTeams()
  })
  const createTeam = useMutation({
    mutationFn: (name: string) => client.createTeam({ name }),
    onSuccess: (data) => {
      toast.success(t('toast.createTeamSuccess'))
      setCreateTeamDialogOpen(false)
      navigate(`/${data.slug}`)
    },
    onError: (error: any) => {
      const code = Client.getErrorCode(error)
      toast.error(code ? t(`errors.${code}`, { ns: 'common' }) : t('toast.createTeamError'))
    }
  })
  const signOut = useMutation({
    mutationFn: () => client.signOut(),
    onSuccess: () => {
      setAuthenticatedUser(null)
      window.location.reload()
    },
    onError: (error: any) => {
      const code = Client.getErrorCode(error)
      toast.error(code ? t(`errors.${code}`, { ns: 'common' }) : t('toast.signOutError'))
    }
  })
  const leaveTeam = useMutation({
    mutationFn: () => client.leaveTeam(),
    onSuccess: () => {
      setLeaveTeamDialogOpen(false)
      toast.success(t('toast.leaveTeamSuccess'))
      getTeams.refetch()
      window.location.reload()
    },
    onError: (error: any) => {
      const code = Client.getErrorCode(error)
      toast.error(code ? t(`errors.${code}`, { ns: 'common' }) : t('toast.leaveTeamError'))
    }
  })
  const updateUserLanguage = useMutation({
    mutationFn: (language: string) => client.updateUserPreferences({ language }),
    onSuccess: () => {
      toast.success(t('toast.languageChangeSuccess'))
      refetchAuthenticatedUser?.()
    },
    onError: (error: any) => {
      const code = Client.getErrorCode(error)
      toast.error(code ? t(`errors.${code}`, { ns: 'common' }) : t('toast.languageChangeError'))
    }
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
          <SidebarGroupLabel>{t('common:teams', { count: 1 })}</SidebarGroupLabel>
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
                      <span>{t(item.title)}</span>
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
              email: authenticatedUser.email,
              language: authenticatedUser.preferences.language
            }}
            isOwner={role === 'owner'}
            onSignOut={() => setLogOutDialogOpen(true)}
            onLeaveTeam={() => setLeaveTeamDialogOpen(true)}
            onLanguageChange={(lang) => {
              i18n.changeLanguage(lang)
              updateUserLanguage.mutate(lang)
            }}
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
          isMutating={signOut.isPending}
          open={logOutDialogOpen}
          onCancel={() => setLogOutDialogOpen(false)}
          onConfirm={() => signOut.mutate()}
        />
      )}
      <SidebarRail />
    </Sidebar>
  )
}
