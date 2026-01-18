import { useState } from 'react'
import { CollapsibleEditBoardSidebar, FixedEditBoardSidebar } from './components'
import { useBoard, useMemberRole } from '@/hooks'
import { Sidebar, useSidebar } from '@/components'

export type EditBoardSidebarSection = 'components'

export function EditBoardSidebar () {
  const [selectedSection, setSelectedSection] = useState<EditBoardSidebarSection>('components')
  const [search, setSearch] = useState('')
  const { setOpen } = useSidebar()
  const { boardController } = useBoard()
  const memberRole = useMemberRole()
  const hasPermission = memberRole !== 'member'

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
    >
      <FixedEditBoardSidebar
        onSectionClick={section => {
          setSelectedSection(section)
          setSearch('')
          setOpen(true)
        }}
      />
      <CollapsibleEditBoardSidebar
        hasPermission={hasPermission}
        boardController={boardController}
        selectedSection={selectedSection}
        search={search}
        onSearchChange={setSearch}
      />
    </Sidebar>
  )
}
