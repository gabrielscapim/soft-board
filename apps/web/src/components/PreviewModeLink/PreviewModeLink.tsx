import { Button } from '@/components/ui/button'
import { PlayIcon } from 'lucide-react'
import { Link } from 'react-router'

export type PreviewModeLinkProps = {
  to: string
}

export function PreviewModeLink (props: PreviewModeLinkProps) {
  const { to } = props

  return (
    <Link to={to} relative="path">
      <Button
        size="sm"
        variant="outline"
      >
        <PlayIcon />
        Preview
      </Button>
    </Link>
  )
}
