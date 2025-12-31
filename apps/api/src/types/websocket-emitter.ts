export interface IWebsocketEmitter<T> {
  emit(event: T, room?: string): void
}
