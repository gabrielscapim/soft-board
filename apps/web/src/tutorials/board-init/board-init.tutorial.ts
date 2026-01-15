import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const boardInitTutorial: Tutorial = {
  name: 'board-init',
  steps: [
    {
      element: getPopoverAnchorSelector('BoardWizardHeaderSteps'),
      popover: {
        title: '✔️ Your progress',
        description:
          'This flow guides you from idea to MVP, step by step, with a clear sense of progress.',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('InitWizardStepRequirements'),
      popover: {
        title: '📝 Define requirements',
        description:
          'List and prioritize the core features your MVP needs to succeed.',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('InitWizardStepWireflows'),
      popover: {
        title: '🧩 Build wireflows',
        description:
          'Sketch simple screens to visualize how users move through your product.',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('InitWizardStepReview'),
      popover: {
        title: '🔍 Review and refine',
        description:
          'Validate your flow, remove friction, and polish the overall experience.',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardFooter'),
      popover: {
        title: '➡️ Navigation',
        description:
          'Use these controls to move forward or backward through the steps.',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      popover: {
        title: '🚀 Let’s get started',
        description:
          'Click “Start” to begin shaping your MVP from idea to structure.',
        side: 'left',
        nextBtnText: 'Got it'
      },
      disableActiveInteraction: true
    }
  ]
}
