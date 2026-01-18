import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'
import { t } from 'i18next'

export const boardInitTutorial: Tutorial = {
  name: 'board-init',
  steps: [
    {
      element: getPopoverAnchorSelector('BoardWizardHeaderSteps'),
      popover: {
        title: t('boardInit.headerSteps.title', { ns: 'tutorial' }),
        description: t('boardInit.headerSteps.description', { ns: 'tutorial' }),
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('InitWizardStepRequirements'),
      popover: {
        title: t('boardInit.stepRequirements.title', { ns: 'tutorial' }),
        description: t('boardInit.stepRequirements.description', { ns: 'tutorial' }),
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('InitWizardStepWireflows'),
      popover: {
        title: t('boardInit.stepWireflows.title', { ns: 'tutorial' }),
        description: t('boardInit.stepWireflows.description', { ns: 'tutorial' }),
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('InitWizardStepReview'),
      popover: {
        title: t('boardInit.stepReview.title', { ns: 'tutorial' }),
        description: t('boardInit.stepReview.description', { ns: 'tutorial' }),
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardFooter'),
      popover: {
        title: t('boardInit.footer.title', { ns: 'tutorial' }),
        description: t('boardInit.footer.description', { ns: 'tutorial' }),
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      popover: {
        title: t('boardInit.getStarted.title', { ns: 'tutorial' }),
        description: t('boardInit.getStarted.description', { ns: 'tutorial' }),
        side: 'left'
      },
      disableActiveInteraction: true
    }
  ]
}
