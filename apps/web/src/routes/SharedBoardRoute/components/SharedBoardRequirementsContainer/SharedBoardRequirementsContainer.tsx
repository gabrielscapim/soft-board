import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { GetSharedBoardByTokenResult } from 'types/endpoints'

export type SharedBoardRequirementsContainerProps = {
  requirements: GetSharedBoardByTokenResult['board']['requirements']
}

export function SharedBoardRequirementsContainer (props: SharedBoardRequirementsContainerProps) {
  const { requirements } = props

  const { t } = useTranslation('routes.sharedBoard')

  return (
    <div className="p-4 overflow-y-auto w-full">
      <div className="flex flex-col gap-4 mx-auto w-full md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
        {requirements.map((requirement) => (
          <Card key={requirement.id} className="py-4 shadow-none w-full">
            <CardHeader className="px-4">
              <CardTitle className="text-sm">
                {requirement.title ? requirement.title : <span className="opacity-30">{t('common:untitled')}</span>}
            </CardTitle>
            <CardDescription className="text-xs">
              {requirement.description ? requirement.description : <span className="opacity-30">{t('noDescription')}</span>}
            </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
