import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent
} from '@/components/ui/sidebar'
import { Component, LayoutPanelTop, Smartphone } from 'lucide-react'
import { EditBoardSidebarSection } from '../EditBoardSidebar'

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

export type FixedEditBoardSidebarProps = {
  onSectionClick?: (section: EditBoardSidebarSection) => void
}

export function FixedEditBoardSidebar (props: FixedEditBoardSidebarProps) {
  const { onSectionClick } = props

  return (
    <Sidebar
      collapsible="none"
      className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {sections.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={{
                    children: item.title,
                      hidden: false
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
