import { useBoardContext, useTeam } from '@/hooks'
import { useNavigate } from 'react-router'
import { Button } from '../ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { Stepper } from '../Stepper'
import { useState } from 'react'
import { ConfirmLeaveBoardDialog } from './ConfirmLeaveBoardDialog'

export function BoardWizardHeader () {
  const [leaveBoardOpen, setLeaveBoardOpen] = useState(false)
  const navigate = useNavigate()
  const { team } = useTeam()
  const { board } = useBoardContext()
  const currentStep = board?.step

  return (
    <header className="flex flex-row items-center sticky top-0 shrink-0 p-4 z-50 bg-muted">
      <div className="w-1/5 flex justify-start">
        <Button
          variant="outline"
          onClick={() => setLeaveBoardOpen(true)}
        >
          <ChevronLeftIcon />
          Boards
        </Button>
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

      <ConfirmLeaveBoardDialog
        open={leaveBoardOpen}
        onCancel={() => setLeaveBoardOpen(false)}
        onConfirm={() => {
          setLeaveBoardOpen(false)
          navigate(`/${team?.slug}/boards`, { replace: true })
        }}
      />
    </header>
  )
}
