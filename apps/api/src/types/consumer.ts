import { ApplicationDependencies } from './application-dependencies'

export type Consumer = (getDeps?: () => ApplicationDependencies | undefined) => ((event: any) => void | Promise<void>)
