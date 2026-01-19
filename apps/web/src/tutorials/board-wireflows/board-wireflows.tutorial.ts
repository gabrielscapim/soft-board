import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'
import { t } from 'i18next'

export const boardWireflowsTutorial: Tutorial = {
  name: 'board-wireflows',
  steps: [
    {
      element: getPopoverAnchorSelector('BoardWizardWireflowsContainer'),
      popover: {
        title: t('boardWireflows.wireflowCanvas.title', { ns: 'tutorial' }),
        description: t('boardWireflows.wireflowCanvas.description', { ns: 'tutorial' }),
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardZoomController'),
      popover: {
        title: t('boardWireflows.zoomControls.title', { ns: 'tutorial' }),
        description: t('boardWireflows.zoomControls.description', { ns: 'tutorial' }),
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('PreviewModeLink'),
      popover: {
        title: t('boardWireflows.previewMode.title', { ns: 'tutorial' }),
        description: t('boardWireflows.previewMode.description', { ns: 'tutorial' }),
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('EditBoardLink'),
      popover: {
        title: t('boardWireflows.editMode.title', { ns: 'tutorial' }),
        description: t('boardWireflows.editMode.description', { ns: 'tutorial' }),
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardChatContainer'),
      popover: {
        title: t('boardWireflows.chatContainer.title', { ns: 'tutorial' }),
        description: t('boardWireflows.chatContainer.description', { ns: 'tutorial' }),
        side: 'top'
      },
      disableActiveInteraction: true
    }
  ]
}
