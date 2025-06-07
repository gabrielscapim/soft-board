import { SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupContent, Sidebar } from '@/components/ui/sidebar'
import { BoardSidebarSection } from '..'
import { BoardComponentsPreview, BoardScreensPreview, SearchInput } from '.'

export type CollapsibleBoardSidebarProps = {
  selectedSection: BoardSidebarSection
  search: string
  onSearchChange?: (search: string) => void
}

export function CollapsibleBoardSidebar (props: CollapsibleBoardSidebarProps) {
  const { selectedSection, search, onSearchChange } = props

  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="text-foreground text-base font-medium">
          {selectedSection}
        </div>
        <SearchInput
          search={search}
          onChange={onSearchChange}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <div className="grid grid-cols-1 gap-2 p-4">
              {selectedSection === 'Components' && <BoardComponentsPreview search={search} />}
              {selectedSection === 'Templates' && <span className="opacity-40">No templates available</span>}
              {selectedSection === 'Screens' && <BoardScreensPreview search={search} />}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
