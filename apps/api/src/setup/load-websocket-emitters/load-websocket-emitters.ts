import { Server } from 'socket.io'
import { IWebsocketEmitter } from '../../types'

export function loadWebsocketEmitters (io?: Server) {
  return {
    exampleEvent: websocketEmitter<any>('exampleEvent', io)
  }
}

class WebsocketEmitter<T> implements IWebsocketEmitter<T> {
  private eventName: string
  private io: Server

  constructor (eventName: string, io: Server) {
    this.eventName = eventName
    this.io = io
  }

  emit (event: T): void {
    this.io.emit(this.eventName, event)
  }
}

class NullWebsocketEmitter<T> implements IWebsocketEmitter<T> {
  private eventName?: string

  constructor (
    eventName?: string
  ) {
    this.eventName = eventName
  }

  emit (): void {
    // Null object pattern
  }
}

function websocketEmitter<T> (eventName: string, io?: Server): IWebsocketEmitter<T> {
  if (io) {
    return new WebsocketEmitter<T>(eventName, io)
  } else {
    return new NullWebsocketEmitter<T>(eventName)
  }
}
