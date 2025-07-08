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
import loginImage from '../../public/sign-in-image.png'
import { Link } from 'react-router'

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
      <SidebarFooter>
        <NavUser user={{
          name: 'Gabriel Scapim',
          email: 'email@email.com',
          avatar: loginImage
        }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
