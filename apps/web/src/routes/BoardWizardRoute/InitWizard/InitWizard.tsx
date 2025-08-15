import { Separator } from '@/components/ui/separator'

const STEPS = [
  {
    title: 'Understand & organize features',
    description: 'List and prioritize the main functionalities you want in your MVP.'
  },
  {
    title: 'Build your wireflows',
    description: 'Create simple, low-fidelity screens showing how users will interact.'
  },
  {
    title: 'Review & refine',
    description: 'Check your flows for clarity, efficiency, and a great user experience.'
  }
]

export function InitWizard () {
  return (
    <div className="grid lg:grid-cols-2 w-full">
      <div className="flex flex-1 items-start justify-center flex-col p-16 gap-10">
        <h1 className="text-5xl font-bold">
          Let’s get started with your board!
        </h1>
        <div className="text-md text-muted-foreground flex flex-col gap-2">
          <p>
            You will follow the <strong>StartFlow</strong> method step-by-step.
          </p>
          <p>
            By the end, you’ll have a low-fidelity MVP ready to present, test, and refine.
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-start justify-center flex-col p-16 gap-10">
        {STEPS.map((step, index) => (
          <>
            <div>
              <div className="flex flex-row gap-3 text-lg font-semibold mb-1">
                <span>
                  {index + 1}
                </span>
                <span>
                  {step.title}
                </span>
              </div>
              <span className="text-muted-foreground ml-6">
                {step.description}
              </span>
            </div>
            {index < STEPS.length - 1 && <Separator />}
          </>
        ))}
      </div>
    </div>
  )

}
