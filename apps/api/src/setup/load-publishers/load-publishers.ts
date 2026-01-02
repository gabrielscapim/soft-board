import { Channel } from 'amqplib'
import { IPublisher } from '../../types'
import { AgentCalledFunctionEvent, UserSignedInEvent, UserSignedOutEvent } from 'event-types'
import { ExchangeName } from '../load-exchanges'

export function loadPublishers (channel?: Channel) {
  return {
    agentCalledFunction: publisher<AgentCalledFunctionEvent>('agent.calledFunction', channel),
    userSignedIn: publisher<UserSignedInEvent>('user.signedIn', channel),
    userSignedOut: publisher<UserSignedOutEvent>('user.signedOut', channel)
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

function publisher<T> (name: ExchangeName, channel?: Channel): IPublisher<T> {
  if (channel) {
    return new Publisher<T>(name, channel)
  } else {
    return new NullPublisher<T>(name)
  }
}
