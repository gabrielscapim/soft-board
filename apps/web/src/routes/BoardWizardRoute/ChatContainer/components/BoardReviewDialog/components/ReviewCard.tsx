import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import clsx from 'clsx'
import { Info, Lightbulb, ChevronsUpDown } from 'lucide-react'
import { GetMessagesResultBoardReview } from 'types/endpoints'

export type ReviewCardProps = {
  review: GetMessagesResultBoardReview['review'][0]
}

export function ReviewCard (props: ReviewCardProps) {
  const { review } = props

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-lg">
              {review.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {review.description}
            </p>
          </div>

          <ScoreIndicator score={review.score} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-muted">
          <div className="flex items-start gap-2">
            <Info className="mt-1 shrink-0" size={16} />
            <p className="text-sm text-foreground/90 leading-relaxed">
              {review.applicable ? review.explanation : review.notApplicableReason}
            </p>
          </div>
        </div>

        {review.suggestions && review.suggestions.length > 0 && (
          <Collapsible defaultOpen={true}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Lightbulb size={16} />
                <h4 className="text-sm font-semibold">
                  {review.suggestions.length} suggestion{review.suggestions.length > 1 ? 's' : ''}
                </h4>
              </div>

              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <ChevronsUpDown />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="mt-2">
              <ul className="space-y-2">
                {review.suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg border"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed">
                      {suggestion}
                    </span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  )
}

function ScoreIndicator ({ score }: { score?: number }) {
  if (score === undefined || score === null) {
    return null
  }

  const colorMap = [
    { min: 4, max: 5, value: 'bg-success/60' },
    { min: 3, max: 3.99, value: 'bg-warning/60' },
    { min: 1, max: 2.99, value: 'bg-destructive/60' }
  ]

  const color = colorMap.find(c => score >= c.min && score <= c.max)?.value

  return (
    <div className="flex items-center gap-3">
      <div
        className={clsx(
          'flex items-center justify-center w-12 h-12 rounded-xl font-bold text-xl',
          color
        )}
      >
        {score}
      </div>
    </div>
  )
}
