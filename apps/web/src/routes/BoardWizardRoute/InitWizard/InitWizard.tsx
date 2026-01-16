import { Separator } from '@/components/ui/separator'
import { TUTORIALS_ANCHORS } from '@/tutorials'
import { useTranslation } from 'react-i18next'
import { Fragment } from 'react/jsx-runtime'

const STEPS = [
  {
    title: 'initWizard.steps.features.title',
    description: 'initWizard.steps.features.description',
    'data-tutorial': TUTORIALS_ANCHORS.InitWizardStepRequirements
  },
  {
    title: 'initWizard.steps.wireflows.title',
    description: 'initWizard.steps.wireflows.description',
    'data-tutorial': TUTORIALS_ANCHORS.InitWizardStepWireflows
  },
  {
    title: 'initWizard.steps.review.title',
    description: 'initWizard.steps.review.description',
    'data-tutorial': TUTORIALS_ANCHORS.InitWizardStepReview
  }
]

export function InitWizard () {
  const { t } = useTranslation('routes.boardWizard')

  return (
    <div className="grid lg:grid-cols-2 w-full">
      <div className="flex flex-1 items-start justify-center flex-col p-16 gap-10">
        <h1 className="text-5xl font-bold">
          {t('initWizard.title')}
        </h1>
        <div className="text-md text-muted-foreground flex flex-col gap-2">
          {t('initWizard.description')}
        </div>
      </div>
      <div className="flex flex-1 items-start justify-center flex-col p-16 gap-10">
        {STEPS.map((step, index) => (
          <Fragment key={index}>
            <div data-tutorial={step['data-tutorial']}>
              <div className="flex flex-row gap-3 text-lg font-semibold mb-1">
                <span>
                  {index + 1}
                </span>
                <span>
                  {t(step.title)}
                </span>
              </div>
              <span className="text-muted-foreground ml-6">
                {t(step.description)}
              </span>
            </div>
            {index < STEPS.length - 1 && <Separator />}
          </Fragment>
        ))}
      </div>
    </div>
  )

}
