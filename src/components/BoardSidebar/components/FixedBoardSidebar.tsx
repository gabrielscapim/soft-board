import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent
} from '@/components/ui/sidebar'
import { Component, LayoutPanelTop, Smartphone } from 'lucide-react'
import { BoardSidebarSection } from '..'

const sections = [
  {
    title: 'Components',
    icon: Component
  },
  {
    title: 'Templates',
    icon: LayoutPanelTop
  },
  {
    title: 'Screens',
    icon: Smartphone
  }
] as const

export type FixedBoardSidebarProps = {
  onSectionClick?: (section: BoardSidebarSection) => void
}

export function FixedBoardSidebar (props: FixedBoardSidebarProps) {
  const { onSectionClick } = props

  return (
    <Sidebar
      collapsible="none"
      className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <text x="7" y="19" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="bold" fill="currentColor">F</text>
                  </svg>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {sections.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={{
                    children: item.title,
                      hidden: false,
                    }}
                    className="px-2.5 md:px-2 cursor-pointer"
                    onClick={() => onSectionClick?.(item.title)}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
