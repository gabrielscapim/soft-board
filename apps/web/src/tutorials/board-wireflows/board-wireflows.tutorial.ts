import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const boardWireflowsTutorial: Tutorial = {
  name: 'board-wireflows',
  steps: [
    {
      element: getPopoverAnchorSelector('BoardWizardWireflowsContainer'),
      popover: {
        title: 'boardWireflows.wireflowCanvas.title',
        description: 'boardWireflows.wireflowCanvas.description',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardZoomController'),
      popover: {
        title: 'boardWireflows.zoomControls.title',
        description: 'boardWireflows.zoomControls.description',
        side: 'left'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('PreviewModeLink'),
      popover: {
        title: 'boardWireflows.previewMode.title',
        description: 'boardWireflows.previewMode.description',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('EditBoardLink'),
      popover: {
        title: 'boardWireflows.editMode.title',
        description: 'boardWireflows.editMode.description',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardWizardChatContainer'),
      popover: {
        title: 'boardWireflows.chatContainer.title',
        description: 'boardWireflows.chatContainer.description',
        side: 'top'
      },
      disableActiveInteraction: true
    }
  ]
}
