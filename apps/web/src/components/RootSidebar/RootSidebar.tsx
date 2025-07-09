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
import { Link } from 'react-router'
import { useAuthentication, useClient } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
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

  const signOut = useMutation({
    mutationFn: () => client.signOut(),
    onSuccess: () => setAuthenticatedUser(null),
    onError: () => toast.error('Failed to sign out')
  })

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher />
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
