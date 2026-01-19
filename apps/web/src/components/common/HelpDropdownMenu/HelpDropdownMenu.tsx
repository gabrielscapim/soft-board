import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components'
import { CircleQuestionMark, BookOpen, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export type HelpDropdownMenuProps = {
  onStartTutorial?: () => void
}

export function HelpDropdownMenu (props: HelpDropdownMenuProps) {
  const { onStartTutorial } = props

  const { t } = useTranslation('components')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="size-8">
          <CircleQuestionMark />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {t('common:help')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild disabled={true}>
          <a href="https://docs.site.com" target="_blank" rel="noopener noreferrer">
            <BookOpen />
            {t('common.helpDropdownMenu.openDocumentation')}
          </a>
        </DropdownMenuItem>

        {onStartTutorial && (
          <DropdownMenuItem
            onClick={onStartTutorial}
          >
            <Play />
            {t('common.helpDropdownMenu.startTutorial')}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
