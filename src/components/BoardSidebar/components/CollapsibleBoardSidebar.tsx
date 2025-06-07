import { SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupContent, Sidebar } from '@/components/ui/sidebar'
import { BoardSidebarSection } from '..'
import { BoardComponentsPreview, BoardScreensPreview, SearchInput } from '.'

export type CollapsibleBoardSidebarProps = {
  selectedSection: BoardSidebarSection
}

export function CollapsibleBoardSidebar (props: CollapsibleBoardSidebarProps) {
  const { selectedSection } = props

  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="text-foreground text-base font-medium">
          {selectedSection}
        </div>
        <SearchInput />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <div className="grid grid-cols-1 gap-2 p-4">
              {selectedSection === 'Components' && <BoardComponentsPreview />}
              {selectedSection === 'Templates' && <span className="opacity-40">No templates available</span>}
              {selectedSection === 'Screens' && <BoardScreensPreview />}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
