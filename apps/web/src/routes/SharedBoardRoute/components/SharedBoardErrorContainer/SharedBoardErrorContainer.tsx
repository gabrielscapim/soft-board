import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export type SharedBoardErrorContainerProps = {
  isNotFound?: boolean
}

export function SharedBoardErrorContainer (props: SharedBoardErrorContainerProps) {
  const { isNotFound } = props

  const { t } = useTranslation('routes.sharedBoard')

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <h2 className="text-lg font-semibold">
        {isNotFound ? t('notFound.title') : t('loadError.title')}
      </h2>

      <p className="text-xs text-muted-foreground">
        {isNotFound
          ? t('notFound.description')
          : t('loadError.description')}
      </p>

      <div className="flex gap-2">
        <Link to="/">
          <Button
            size="sm"
            variant="outline"
          >
            {t('common:return')}
          </Button>
        </Link>
      </div>
    </div>
  )
}
