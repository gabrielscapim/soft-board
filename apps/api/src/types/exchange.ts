import { Consumer } from './consumer'

export type Exchange = {
  name: string
  type: string
  bindings: {
    name: string
    key: string
    consumer: Consumer
  }[]
}
