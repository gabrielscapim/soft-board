/**
 * Anchors used in tutorials to guide users through the application.
 * The keys represent the specific UI elements, and the values are the corresponding data-tutorial attributes.
 */
export const TUTORIALS_ANCHORS = {
  BoardCard: 'board.list.item',
  BoardsRoute: 'board.list.container',
  CreateBoardButton: 'board.list.create',
  RootSidebar: 'sidebar.navigation',
  RootSidebarBoardsItem: 'sidebar.navigation.boards',
  RootSidebarMembersItem: 'sidebar.navigation.team',
  RootSidebarSettingsItem: 'sidebar.navigation.settings',
  TeamSwitcher: 'sidebar.team.switcher',
  NavUser: 'sidebar.user.menu',
  BoardWizardHeaderSteps: 'board.header.steps',
  BoardWizardFooter: 'board.footer',
  InitWizardStepRequirements: 'board.init.step.requirements',
  InitWizardStepWireflows: 'board.init.step.wireflows',
  InitWizardStepReview: 'board.init.step.review',
  BoardWizardFooterNextStepButton: 'board.footer.next',

  BoardWizardRequirementsContainer: 'board.requirements.container',
  BoardWizardRequirementsContainerCreateButton: 'board.requirements.container.create.button',
  BoardWizardChatContainer: 'board.chat.container',
  BoardWizardWireflowsContainer: 'board.wireflows.container',
  BoardZoomController: 'board.zoom.controller',
  PreviewModeLink: 'board.preview.mode.link',
  EditBoardLink: 'board.edit.link'
}

export function getPopoverAnchorSelector (anchorKey: keyof typeof TUTORIALS_ANCHORS) {
  return `[data-tutorial="${TUTORIALS_ANCHORS[anchorKey]}"]`
}
