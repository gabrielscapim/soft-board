import { useState } from 'react'
import { Sidebar, useSidebar } from '../ui/sidebar'
import { CollapsibleBoardSidebar, FixedBoardSidebar } from './components'

export type BoardSidebarSection =
  'Components' |
  'Templates' |
  'Screens'

export function BoardSidebar () {
  const [selectedSection, setSelectedSection] = useState<BoardSidebarSection>('Components')
  const [search, setSearch] = useState('')
  const { setOpen } = useSidebar()

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
    >
      <FixedBoardSidebar
        onSectionClick={section => {
          setSelectedSection(section)
          setSearch('')
          setOpen(true)
        }}
      />
      <CollapsibleBoardSidebar
        selectedSection={selectedSection}
        search={search}
        onSearchChange={setSearch}
      />
    </Sidebar>
  )
}
