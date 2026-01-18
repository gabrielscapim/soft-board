import { SidebarTrigger, HelpDropdownMenu, Separator } from '@/components'
import { useTranslation } from 'react-i18next'

export type RootHeaderProps = {
  title: string
  onStartTutorial?: () => void
}

export function RootHeader (props: RootHeaderProps) {
  const { title, onStartTutorial } = props

  const { t } = useTranslation('')

  return (
    <header className="bg-background sticky top-0 shrink-0 border-b p-2.5 z-50 flex items-center justify-between">
      <div className="flex w-full items-center">
        <SidebarTrigger className="m-0" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <span className="text-sm">{t(title)}</span>
      </div>
      <HelpDropdownMenu onStartTutorial={onStartTutorial} />
    </header>
  )
}
