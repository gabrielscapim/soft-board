export interface IPublisher<T> {
  publish (event: T, key?: string): void
}
