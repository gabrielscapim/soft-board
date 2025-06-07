import { Label } from '@/components/ui/label'
import { SidebarGroup, SidebarGroupContent, SidebarInput } from '@/components/ui/sidebar'
import { Search } from 'lucide-react'

export type SearchInputProps = {
  search: string
  onChange?: (search: string) => void
}

export function SearchInput (props: SearchInputProps) {
  const { search, onChange } = props

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupContent className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          className="pl-8"
          placeholder="Search"
          value={search}
          onChange={event => onChange?.(event.target.value)}
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
