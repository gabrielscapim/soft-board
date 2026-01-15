import { Dimensions, SoftComponentType } from '@/types'

export const SOFT_COMPONENT_MIN_DIMENSIONS: Record<SoftComponentType, Dimensions> = {
  button: { width: 80, height: 32 },
  divider: { width: 32, height: 4 },
  icon: { width: 16, height: 16 },
  input: { width: 120, height: 32 },
  mobileScreen: { width: 375, height: 812 },
  radioButton: { width: 16, height: 16 },
  shape: { width: 32, height: 32 },
  text: { width: 32, height: 16 },
  toggle: { width: 40, height: 20 }
}
