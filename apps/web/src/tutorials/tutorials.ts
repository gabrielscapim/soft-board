import { boardInitTutorial } from './board-init'
import { boardRequirementsTutorial } from './board-requirements'
import { boardWireflowsTutorial } from './board-wireflows'
import { onboardingTutorial } from './onboarding'

export const TUTORIALS = {
  [boardInitTutorial.name]: boardInitTutorial,
  [boardRequirementsTutorial.name]: boardRequirementsTutorial,
  [boardWireflowsTutorial.name]: boardWireflowsTutorial,
  [onboardingTutorial.name]: onboardingTutorial
}
