import { Button } from '@/components'
import { SquareMousePointerIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export function NotFoundScreenContainer () {
  const { t } = useTranslation('components')

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 w-full">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
        {t('board.previewModeContainer.noScreensFound')}
      </h1>
      <p className="text-muted-foreground">
        {t('board.previewModeContainer.addScreenTitle')}
      </p>
      <Link to=".." relative="path">
        <Button variant="outline">
          <SquareMousePointerIcon />
          {t('board.previewModeContainer.returnToBoard')}
        </Button>
      </Link>
    </div>
  )
}
