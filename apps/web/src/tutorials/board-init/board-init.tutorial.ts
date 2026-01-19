import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const boardInitTutorial: Tutorial = {
  name: 'board-init',
  steps: [
    {
      element: getPopoverAnchorSelector('BoardWizardHeaderSteps'),
      popover: {
        title: 'boardInit.headerSteps.title',
        description: 'boardInit.headerSteps.description',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('InitWizardStepRequirements'),
      popover: {
        title: 'boardInit.stepRequirements.title',
        description: 'boardInit.stepRequirements.description',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('InitWizardStepWireflows'),
      popover: {
        title: 'boardInit.stepWireflows.title',
        description: 'boardInit.stepWireflows.description',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('InitWizardStepReview'),
      popover: {
        title: 'boardInit.stepReview.title',
        description: 'boardInit.stepReview.description',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardFooter'),
      popover: {
        title: 'boardInit.footer.title',
        description: 'boardInit.footer.description',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      popover: {
        title: 'boardInit.getStarted.title',
        description: 'boardInit.getStarted.description',
        side: 'left'
      },
      disableActiveInteraction: true
    }
  ]
}
