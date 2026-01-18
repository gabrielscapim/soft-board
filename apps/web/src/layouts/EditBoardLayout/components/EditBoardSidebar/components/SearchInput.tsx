import { Label, SidebarGroup, SidebarGroupContent, SidebarInput } from '@/components'
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export type SearchInputProps = {
  search: string
  onChange?: (search: string) => void
}

export function SearchInput (props: SearchInputProps) {
  const { search, onChange } = props

  const { t } = useTranslation()

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupContent className="relative">
        <Label htmlFor="search" className="sr-only">
          {t('search')}
        </Label>
        <SidebarInput
          id="search"
          className="pl-8"
          placeholder={t('search')}
          value={search}
          onChange={event => onChange?.(event.target.value)}
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
