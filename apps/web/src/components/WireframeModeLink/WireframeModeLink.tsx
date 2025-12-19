import { Button } from '@/components/ui/button'
import { PlayIcon } from 'lucide-react'
import { Link } from 'react-router'

export type WireframeModeLinkProps = {
  to: string
}

export function WireframeModeLink (props: WireframeModeLinkProps) {
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
