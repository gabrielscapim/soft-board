/**
 * Anchors used in tutorials to guide users through the application.
 * The keys represent the specific UI elements, and the values are the corresponding data-tutorial attributes.
 */
export const TUTORIALS_ANCHORS = {
  Board: 'board',
  BoardCard: 'board.list.item',
  BoardComponentCardPreview: 'board.component.card.preview',
  BoardPropertiesMenu: 'board.properties.menu',
  BoardPropertiesMenuActionsTab: 'board.properties.menu.actions.tab',
  BoardWizardChatContainer: 'board.chat.container',
  BoardWizardFooter: 'board.footer',
  BoardWizardFooterNextStepButton: 'board.footer.next',
  BoardWizardHeaderSteps: 'board.header.steps',
  BoardWizardRequirementsContainer: 'board.requirements.container',
  BoardWizardRequirementsContainerCreateButton: 'board.requirements.container.create.button',
  BoardWizardReviewContainer: 'board.review.container',
  BoardWizardWireflowsContainer: 'board.wireflows.container',
  BoardZoomController: 'board.zoom.controller',
  BoardsRoute: 'board.list.container',
  CollapsibleEditBoardSidebar: 'board.sidebar.edit.collapsible',
  CreateBoardButton: 'board.list.create',
  EditBoardHeaderAddScreenButton: 'board.header.add.screen.button',
  EditBoardLink: 'board.edit.link',
  InitWizardStepRequirements: 'board.init.step.requirements',
  InitWizardStepReview: 'board.init.step.review',
  InitWizardStepWireflows: 'board.init.step.wireflows',
  NavUser: 'sidebar.user.menu',
  PreviewModeContainerMobileScreenContainer: 'board.preview.mobile.screen.container',
  PreviewModeLink: 'board.preview.mode.link',
  PreviewModeMobileScreenContainerTopBarScreenSelector: 'board.preview.mobile.screen.selector',
  RootSidebar: 'sidebar.navigation',
  RootSidebarBoardsItem: 'sidebar.navigation.boards',
  RootSidebarMembersItem: 'sidebar.navigation.team',
  RootSidebarSettingsItem: 'sidebar.navigation.settings',
  TeamSwitcher: 'sidebar.team.switcher'
}

export function getPopoverAnchorSelector (anchorKey: keyof typeof TUTORIALS_ANCHORS) {
  return `[data-tutorial="${TUTORIALS_ANCHORS[anchorKey]}"]`
}
