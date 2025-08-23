import { Channel } from 'amqplib'
import { IPublisher } from '../../types'
import { AgentCalledFunctionEvent, UserSignedInEvent, UserSignedOutEvent } from 'event-types'

export function loadPublishers (channel: Channel) {
  return {
    agentCalledFunction: publisher<AgentCalledFunctionEvent>('agentCalledFunction', channel),
    userSignedIn: publisher<UserSignedInEvent>('userSignedIn', channel),
    userSignedOut: publisher<UserSignedOutEvent>('userSignedOut', channel)
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
