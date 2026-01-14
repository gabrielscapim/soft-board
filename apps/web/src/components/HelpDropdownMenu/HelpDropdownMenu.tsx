import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { CircleQuestionMark, BookOpen, Play } from 'lucide-react'
import { Button } from '../ui/button'

export type HelpDropdownMenuProps = {
  onStartTutorial?: () => void
}

export function HelpDropdownMenu (props: HelpDropdownMenuProps) {
  const { onStartTutorial } = props

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="size-8">
          <CircleQuestionMark />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Help
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild disabled={true}>
          <a href="https://docs.site.com" target="_blank" rel="noopener noreferrer">
            <BookOpen />
            Open documentation
          </a>
        </DropdownMenuItem>

        {onStartTutorial && (
          <DropdownMenuItem
            onClick={onStartTutorial}
          >
            <Play />
            Start tutorial
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
