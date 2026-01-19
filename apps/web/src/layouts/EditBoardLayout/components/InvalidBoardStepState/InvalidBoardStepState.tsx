import { Button } from '@/components'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export function InvalidBoardStepState () {
  const { t } = useTranslation('layouts.editBoardLayout')

  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter">
            {t('invalidBoardStepState.title')}
          </h1>

          <p className="text-muted-foreground">
            {t('invalidBoardStepState.description')}
          </p>

          <Button asChild className="mt-2" variant="outline">
            <Link to=".." relative="path">
              {t('invalidBoardStepState.return')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
