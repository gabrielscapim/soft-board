import amqplib, { type Channel, type ChannelModel } from 'amqplib'
import { RABBIT_URL } from '../../constants'

let rabbitmq: RabbitMQ | null = null

export type RabbitMQ = {
  connection: ChannelModel
  channel: Channel
}

/**
 * Get a RabbitMQ connection and channel.
 * The connection is established using the RabbitMQ URL from the environment variables.
 * The channel is created from the connection.
 * @returns A promise that resolves to a RabbitMQ object.
 */
export async function getRabbitMQ (): Promise<RabbitMQ> {
  if (!rabbitmq) {
    const connection = await amqplib.connect(RABBIT_URL)
    const channel = await connection.createChannel()

    rabbitmq = { connection, channel }
  }

  return rabbitmq
}
