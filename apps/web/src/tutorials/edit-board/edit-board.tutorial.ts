import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const editBoardTutorial: Tutorial = {
  name: 'edit-board',
  steps: [
    {
      element: getPopoverAnchorSelector('Board'),
      popover: {
        title: 'Your board canvas',
        description: 'You can drag, resize, and position components on your board as you like.',
        side: 'left'
      },
      disableActiveInteraction: false
    },
    {
      element: getPopoverAnchorSelector('EditBoardHeaderAddScreenButton'),
      popover: {
        title: 'Add a new screen',
        description:
          'Click this button to add a new mobile screen to your board.',
        side: 'bottom',
        onNextClick: async (element, _step, { driver }) => {
          const button = element as HTMLElement

          button.focus()
          button.click()

          await new Promise(resolve => setTimeout(resolve, 50))

          document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

          await new Promise(resolve => setTimeout(resolve, 50))

          driver.moveNext()
        }
      },
      disableActiveInteraction: false
    },
    {
      element: getPopoverAnchorSelector('CollapsibleEditBoardSidebar'),
      popover: {
        title: 'List of the components',
        description:
          'Here you can find all the components available to add to your board.',
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardComponentCardPreview'),
      popover: {
        title: 'Component',
        description:
          'Just click on a component to add it to your board canvas.',
        side: 'right',
        onNextClick: async (element, _step, { driver }) => {
          const card = element as HTMLElement

          card.focus()
          card.click()

          await new Promise(resolve => setTimeout(resolve, 50))

          driver.moveNext()
        }
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardPropertiesMenu'),
      popover: {
        title: 'Component properties',
        description:
          'You can edit the properties of the selected component here.',
        side: 'left',
        onNextClick: async (_element, _step, { driver }) => {
          const actionsTabTrigger = document.querySelector(
            getPopoverAnchorSelector('BoardPropertiesMenuActionsTab')
          ) as HTMLElement

          actionsTabTrigger.focus()
          actionsTabTrigger.click()

          await new Promise(resolve => setTimeout(resolve, 50))

          driver.moveNext()
        }
      },
      disableActiveInteraction: false
    },
    {
      element: getPopoverAnchorSelector('BoardPropertiesMenu'),
      popover: {
        title: 'Actions tab',
        description: 'You can connect a screen and navigate to it in the preview mode.',
        side: 'bottom',
        onNextClick: async (_element, _step, { driver }) => {
          // Press "esc"
          document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

          await new Promise(resolve => setTimeout(resolve, 50))

          driver.moveNext()
        }
      },
      disableActiveInteraction: false
    }
  ]
}


  // CollapsibleEditBoardSidebar: 'board.sidebar.edit.collapsible',
  // BoardComponentCardPreview: 'board.component.card.preview',
  // BoardPropertiesMenu: 'board.properties.menu',
  // BoardPropertiesMenuActionsTab: 'board.properties.menu.actions.tab', // click

  // EditBoardHeaderAddScreenButton: 'board.header.add.screen.button'
