import { useBoard, useTeam } from '@/hooks'
import { useNavigate } from 'react-router'
import { Button, HelpDropdownMenu, Stepper } from '@/components'
import { ChevronLeftIcon } from 'lucide-react'
import { useState } from 'react'
import { ConfirmLeaveBoardDialog } from './ConfirmLeaveBoardDialog'
import { TUTORIALS_ANCHORS } from '@/tutorials'

export type BoardWizardHeaderProps = {
  onStartTutorial?: () => void
}

export function BoardWizardHeader (props: BoardWizardHeaderProps) {
  const { onStartTutorial } = props

  const [leaveBoardOpen, setLeaveBoardOpen] = useState(false)
  const navigate = useNavigate()
  const { team } = useTeam()
  const { board } = useBoard()
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

      <div
        data-tutorial={TUTORIALS_ANCHORS.BoardWizardHeaderSteps}
        className="w-3/5 flex justify-center"
      >
        <Stepper
          steps={[
            { label: 'Init', state: 'init', visible: false },
            { label: 'Requirements', state: 'requirements', visible: true },
            { label: 'Wireflows', state: 'wireflows', visible: true },
            { label: 'Review', state: 'review', visible: true },
            { label: 'End', state: 'end', visible: false }
          ]}
          currentStep={currentStep}
        />
      </div>

      <div className="w-1/5 flex justify-end">
        <HelpDropdownMenu onStartTutorial={onStartTutorial} />
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
