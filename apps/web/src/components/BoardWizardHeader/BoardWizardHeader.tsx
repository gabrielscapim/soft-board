import { useSelectedBoard } from '@/hooks'
import { Link, useParams } from 'react-router'
import { Button } from '../ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { Stepper } from '../Stepper'

export function BoardWizardHeader () {
  const params = useParams<{ boardId?: string }>()
  const boardId = params.boardId
  const { board } = useSelectedBoard(boardId)
  const currentStep = board?.step

  return (
    <header className="flex flex-row items-center sticky top-0 shrink-0 p-4 z-50 bg-muted">
      <div className="w-1/5 flex justify-start">
        <Link
          to={`/${board?.team.slug ?? ''}/boards`}
          className="flex items-center gap-2 font-medium"
        >
          <Button variant="outline">
            <ChevronLeftIcon />
            Boards
          </Button>
        </Link>
      </div>

      <div className="w-3/5 flex justify-center">
        <Stepper
          steps={[
            { label: 'Requirements', state: 'requirements' },
            { label: 'Wireflows', state: 'wireflows' },
            { label: 'Review', state: 'review' }
          ]}
          currentStep={currentStep}
        />
      </div>
    </header>
  )
}
