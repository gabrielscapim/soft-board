import { UUID } from '../common/uuid'

export type GuideDistance = 'primary' | 'secondary'

export type GuideSnap = 'start' | 'center' | 'end'

export type Guide = {
  componentToAlign: {
    id: UUID
  }
  distance: GuideDistance
  lineGuide: number
  offset: number
  diff: number
  snap: GuideSnap
}
