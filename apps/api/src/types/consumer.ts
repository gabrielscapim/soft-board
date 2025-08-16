export type Consumer = (deps?: any) => ((event: any) => void | Promise<void>)
