import { Button } from '@/components/ui/button'
import { TUTORIALS_ANCHORS } from '@/tutorials'
import { PlayIcon } from 'lucide-react'
import { Link } from 'react-router'

export type PreviewModeLinkProps = {
  to: string
}

export function PreviewModeLink (props: PreviewModeLinkProps) {
  const { to } = props

  return (
    <Link
      data-tutorial={TUTORIALS_ANCHORS.PreviewModeLink}
      to={to}
      relative="path"
    >
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
