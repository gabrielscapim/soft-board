import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const boardInitTutorial: Tutorial = {
  name: 'board-init',
  steps: [
    {
      popover: {
        title: 'Welcome to your board 🚀',
        description:
          'This is your workspace to define, design, and review your product idea step by step.',
        side: 'over',
        nextBtnText: 'Show me how it works',
        showButtons: ['next']
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardHeaderSteps'),
      popover: {
        title: 'Your progress steps',
        description:
          'This flow guides you from idea to a clear MVP, moving step by step.',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('InitWizardStepRequirements'),
      popover: {
        title: 'Requirements',
        description:
          'Start by defining and prioritizing the core features of your MVP.',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('InitWizardStepWireflows'),
      popover: {
        title: 'Wireflows',
        description:
          'Create simple screens to visualize how users will interact with your product.',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('InitWizardStepReview'),
      popover: {
        title: 'Review & refine',
        description:
          'Validate your flow, remove friction, and polish the experience.',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardFooter'),
      popover: {
        title: 'Navigation controls',
        description: 'Use these buttons to move through the steps of your board.',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      popover: {
        title: 'Let’s get started ✨',
        description:
          'Click "Start" to begin your journey towards building a successful MVP!',
        side: 'left',
        nextBtnText: 'Got it'
      },
      disableActiveInteraction: true
    }
  ]
}
