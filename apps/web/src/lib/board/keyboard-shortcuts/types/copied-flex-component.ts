import { FlexComponent } from '@/types'

export type CopiedFlexComponent = FlexComponent & {
  children?: FlexComponent[]
}
