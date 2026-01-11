export interface IWebsocketEmitter<T> {
  emit(event: T, rooms?: string[]): void
}
