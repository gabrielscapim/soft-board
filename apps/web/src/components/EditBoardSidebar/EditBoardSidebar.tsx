import { useState } from 'react'
import { Sidebar, useSidebar } from '../ui/sidebar'
import { CollapsibleEditBoardSidebar, FixedEditBoardSidebar } from './components'
import { useBoard, useMemberRole } from '@/hooks'

export type EditBoardSidebarSection =
  'Components' |
  'Templates' |
  'Screens'

export function EditBoardSidebar () {
  const [selectedSection, setSelectedSection] = useState<EditBoardSidebarSection>('Components')
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
