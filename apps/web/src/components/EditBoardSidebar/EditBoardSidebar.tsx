import { useState } from 'react'
import { Sidebar, useSidebar } from '../ui/sidebar'
import { CollapsibleEditBoardSidebar, FixedEditBoardSidebar } from './components'
import { useBoard } from '@/hooks'

export type EditBoardSidebarSection =
  'Components' |
  'Templates' |
  'Screens'

export function EditBoardSidebar () {
  const [selectedSection, setSelectedSection] = useState<EditBoardSidebarSection>('Components')
  const [search, setSearch] = useState('')
  const { setOpen } = useSidebar()
  const { boardController } = useBoard()

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
        boardController={boardController}
        selectedSection={selectedSection}
        search={search}
        onSearchChange={setSearch}
      />
    </Sidebar>
  )
}
