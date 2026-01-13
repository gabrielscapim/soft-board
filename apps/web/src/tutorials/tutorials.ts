import { boardInitTutorial } from './board-init'
import { boardRequirementsTutorial } from './board-requirements'
import { onboardingTutorial } from './onboarding'

export const TUTORIALS = {
  boardInit: boardInitTutorial,
  boardRequirements: boardRequirementsTutorial,
  onboarding: onboardingTutorial
} as const
