import { Channel } from 'amqplib'
import { IPublisher } from '../../types'

export function loadPublishers (channel: Channel) {
  return {
    publishLogger: publisher<LoggerEvent>('logger', channel)
  }
}

class Publisher<T> implements IPublisher<T> {
  private name: string
  private channel: Channel

  constructor (
    name: string,
    channel: Channel
  ) {
    this.name = name
    this.channel = channel
  }

  publish (event: T, key = ''): void {
    this.channel.publish(
      this.name, key, Buffer.from(JSON.stringify(event))
    )
  }
}

class NullPublisher<T> implements IPublisher<T> {
  private name?: string

  constructor (
    name?: string
  ) {
    this.name = name
  }

  publish (): void {
    // Null object pattern
  }
}

function publisher<T> (name: string, channel?: Channel): IPublisher<T> {
  if (channel) {
    return new Publisher<T>(name, channel)
  } else {
    return new NullPublisher<T>(name)
  }
}

export type LoggerEvent = {
  message: string
}
