import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

export type OverallScoreProps = {
  score: number
}

export function OverallScore (props: OverallScoreProps) {
  const { score } = props

  const percentage = (score / 5) * 100
  const color = getFromMap(score, colorMap)
  const description = getFromMap(score, descriptionMap)

  const { t } = useTranslation('routes.boardWizard')

  return (
    <Card className="flex flex-row gap-0 items-center">
      <CardContent className="pr-0">
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-muted"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className={clsx(color, 'transition-all duration-1000 ease-out')}
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-2xl font-bold"
            >
              {score.toFixed(1)}
            </span>
          </div>
        </div>
      </CardContent>

      <div className="flex-1 items-center justify-center">
        <CardHeader>
          <CardTitle>{t('review.overallScore')}</CardTitle>
          <CardDescription>{t(`review.scoreDescription.${description}`)}</CardDescription>
        </CardHeader>
      </div>
    </Card>
  )
}

const descriptionMap: { min: number, max: number, value: string }[] = [
  { min: 5, max: 5, value: 'excellent' },
  { min: 4, max: 4.99, value: 'good' },
  { min: 3, max: 3.99, value: 'average' },
  { min: 2, max: 2.99, value: 'poor' },
  { min: 1, max: 1.99, value: 'bad' }
]

const colorMap: { min: number, max: number, value: string }[] = [
  { min: 4, max: 5, value: 'text-success stroke-success' },
  { min: 3, max: 3.99, value: 'text-warning stroke-warning' },
  { min: 1, max: 2.99, value: 'text-destructive stroke-destructive' }
]

function getFromMap (score: number, map: { min: number, max: number, value: string }[]) {
  return map.find(item => score >= item.min && score <= item.max)?.value
}
