import { SoftComponent } from '@/types'

export type CopiedSoftComponent = SoftComponent & {
  children?: SoftComponent[]
}
