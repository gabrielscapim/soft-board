import { useState } from 'react'
import { Sidebar } from '../ui/sidebar'
import { CollapsibleBoardSidebar, FixedBoardSidebar } from './components'

export type BoardSidebarSection =
  'Components' |
  'Templates' |
  'Screens'

export function BoardSidebar () {
  const [selectedSection, setSelectedSection] = useState<BoardSidebarSection>('Components')
  const [search, setSearch] = useState('')

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
    >
      <FixedBoardSidebar
        onSectionClick={section => {
          setSelectedSection(section)
          setSearch('')
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
