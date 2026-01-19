import { getPopoverAnchorSelector } from '../anchors.tutorials'
import { Tutorial } from '../types'

export const onboardingTutorial: Tutorial = {
  name: 'onboarding',
  steps: [
    {
      element: getPopoverAnchorSelector('RootSidebar'),
      popover: {
        title: 'onboarding.mainNavigation.title',
        description: 'onboarding.mainNavigation.description',
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('TeamSwitcher'),
      popover: {
        title: 'onboarding.teamSwitcher.title',
        description: 'onboarding.teamSwitcher.description',
        side: 'bottom'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('RootSidebarBoardsItem'),
      popover: {
        title: 'onboarding.boards.title',
        description: 'onboarding.boards.description',
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('RootSidebarMembersItem'),
      popover: {
        title: 'onboarding.teamMembers.title',
        description: 'onboarding.teamMembers.description',
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('RootSidebarSettingsItem'),
      popover: {
        title: 'onboarding.teamSettings.title',
        description: 'onboarding.teamSettings.description',
        side: 'right'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('NavUser'),
      popover: {
        title: 'onboarding.yourAccount.title',
        description: 'onboarding.yourAccount.description',
        side: 'top'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('BoardsRoute'),
      popover: {
        title: 'onboarding.yourBoards.title',
        description: 'onboarding.yourBoards.description',
        side: 'top'
      },
      disableActiveInteraction: true
    },
    {
      element: getPopoverAnchorSelector('CreateBoardButton'),
      popover: {
        title: 'onboarding.createBoard.title',
        description: 'onboarding.createBoard.description',
        side: 'left'
      },
      disableActiveInteraction: false
    },
    {
      popover: {
        title: 'onboarding.ready.title',
        description: 'onboarding.ready.description',
        side: 'bottom'
      }
    }
  ]
}
