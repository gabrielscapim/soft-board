import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'
import { t } from 'i18next'

export const boardRequirementsTutorial: Tutorial = {
  name: 'board-requirements',
  steps: [
    {
      element: getPopoverAnchorSelector('BoardWizardRequirementsContainer'),
      popover: {
        title: t('boardRequirements.requirementsList.title', { ns: 'tutorial' }),
        description: t('boardRequirements.requirementsList.description', { ns: 'tutorial' })  ,
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardRequirementsContainerCreateButton'),
      popover: {
        title: t('boardRequirements.addRequirementButton.title', { ns: 'tutorial' }),
        description: t('boardRequirements.addRequirementButton.description', { ns: 'tutorial' }),
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardChatContainer'),
      popover: {
        title: t('boardRequirements.chatInput.title', { ns: 'tutorial' }),
        description: t('boardRequirements.chatInput.description', { ns: 'tutorial' }),
        side: 'top'
      },
      disableActiveInteraction: true
    }
  ]
}
