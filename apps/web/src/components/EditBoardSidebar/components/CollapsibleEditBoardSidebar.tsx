import { SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupContent, Sidebar, useSidebar } from '@/components/ui/sidebar'
import { BoardComponentsPreview, SearchInput } from '.'
import { EditBoardSidebarSection } from '../EditBoardSidebar'
import { BoardController } from '@/lib'
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'

export type CollapsibleEditBoardSidebarProps = {
  boardController: BoardController
  selectedSection: EditBoardSidebarSection
  search: string
  onSearchChange?: (search: string) => void
}

export function CollapsibleEditBoardSidebar (props: CollapsibleEditBoardSidebarProps) {
  const { boardController, selectedSection, search, onSearchChange } = props

  const { toggleSidebar } = useSidebar()

  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex justify-between items-center w-full">
          <div className="text-foreground text-base font-medium">
            {selectedSection}
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="size-7"
            onClick={toggleSidebar}
          >
            <XIcon />
          </Button>
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
              {selectedSection === 'Components' && <BoardComponentsPreview search={search} boardController={boardController} />}
              {selectedSection === 'Templates' && <span className="opacity-40">No templates found</span>}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
