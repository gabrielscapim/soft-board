import clsx, { ClassValue } from 'clsx'
import { Fragment } from 'react/jsx-runtime'

export type StepperProps = {
  steps: {
    label: string
    state: string
    visible: boolean
  }[]
  currentStep?: string
  className?: ClassValue
}

export function Stepper (props: StepperProps) {
  const { steps, currentStep, className } = props

  const currentStepIndex = steps.findIndex(step => step.state === currentStep)
  const visibleSteps = steps.filter(step => step.visible)

  return (
    <div className={clsx('flex gap-2 flex-row items-center justify-between w-full', className)}>
      {visibleSteps.map((step, index) => {
        const stepIndex = steps.findIndex(s => s.state === step.state)
        const isActive = step.state === currentStep
        const isComplete = stepIndex < currentStepIndex
        const isLast = step === visibleSteps[visibleSteps.length - 1]

        return (
          <Fragment key={step.state}>
            <div className="group peer relative flex items-center gap-2">
              <div
                className={clsx(
                  'inline-flex',
                  'items-center',
                  'justify-center',
                  'gap-2',
                  'whitespace-nowrap',
                  'text-sm',
                  'font-medium',
                  'transition-colors',
                  'focus-visible:outline-hidden',
                  'focus-visible:ring-1',
                  'focus-visible:ring-ring',
                  'disabled:pointer-events-none',
                  'disabled:opacity-50',
                  '[&_svg]:pointer-events-none',
                  '[&_svg]:size-4',
                  '[&_svg]:shrink-0',
                  'h-7',
                  'w-7',
                  'rounded-full',
                  'shadow-xs',
                  (isComplete || isActive) && 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
                  !isComplete && !isActive && 'bg-secondary text-secondary-foreground hover:bg-secondary'
                )}
              >
                {isComplete ? '✓' : index + 1}
              </div>
              <div className="flex flex-col items-start">
                <h4 className="text-base font-medium">{step.label}</h4>
              </div>
            </div>

            {!isLast && (
              <div
                className={clsx(
                  'flex-1',
                  'h-0.5',
                  'transition-all',
                  'duration-300',
                  'ease-in-out',
                  !isComplete && 'opacity-15',
                  isComplete ? 'bg-primary' : 'bg-muted-foreground'
                )}
              />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
