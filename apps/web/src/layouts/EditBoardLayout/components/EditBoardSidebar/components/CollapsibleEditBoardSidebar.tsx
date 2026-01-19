import { Button, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupContent, Sidebar, useSidebar } from '@/components'
import { BoardComponentsPreview, SearchInput } from '.'
import { EditBoardSidebarSection } from '../EditBoardSidebar'
import { BoardController } from '@/lib'
import { XIcon } from 'lucide-react'
import { TUTORIALS_ANCHORS } from '@/tutorials'
import { useTranslation } from 'react-i18next'

export type CollapsibleEditBoardSidebarProps = {
  boardController: BoardController
  selectedSection: EditBoardSidebarSection
  search: string
  hasPermission?: boolean
  onSearchChange?: (search: string) => void
}

export function CollapsibleEditBoardSidebar (props: CollapsibleEditBoardSidebarProps) {
  const { boardController, selectedSection, search, hasPermission, onSearchChange } = props

  const { t } = useTranslation()
  const { toggleSidebar } = useSidebar()

  return (
    <Sidebar
      data-tutorial={TUTORIALS_ANCHORS.CollapsibleEditBoardSidebar}
      collapsible="none"
      className="hidden flex-1 md:flex"
    >
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex justify-between items-center w-full">
          <div className="text-foreground text-base font-medium">
            {t(`common:${selectedSection}`)}
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
              {selectedSection === 'components' && (
                <BoardComponentsPreview
                  disabled={hasPermission === false}
                  search={search}
                  boardController={boardController}
                />
              )}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
