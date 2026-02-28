import { Button } from '@/components'
import { TUTORIALS_ANCHORS } from '@/tutorials'
import { PencilIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export type EditBoardLinkProps = {
  to: string
}

export function EditBoardLink (props: EditBoardLinkProps) {
  const { to } = props

  const { t } = useTranslation()

  return (
    <Link
      data-tutorial={TUTORIALS_ANCHORS.EditBoardLink}
      to={to}
      relative="path"
    >
      <Button
        size="sm"
        variant="outline"
      >
        <PencilIcon />
        {t('edit')}
      </Button>
    </Link>
  )
}
