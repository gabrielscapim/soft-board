import { Button } from '@/components'
import { TUTORIALS_ANCHORS } from '@/tutorials'
import { PlayIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export type PreviewModeLinkProps = {
  to: string
}

export function PreviewModeLink (props: PreviewModeLinkProps) {
  const { to } = props

  const { t } = useTranslation()

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
        {t('preview')}
      </Button>
    </Link>
  )
}
