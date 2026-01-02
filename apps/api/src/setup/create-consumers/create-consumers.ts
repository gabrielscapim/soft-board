import { ApplicationDependencies, Exchange } from '../../types'
import { logger } from '../../libs'
import { Channel } from 'amqplib'
import { AwilixContainer } from 'awilix'

export async function createConsumers (
  channel: Channel,
  exchanges: Exchange[],
  container: AwilixContainer<ApplicationDependencies>
): Promise<void> {
  for (const exchange of exchanges) {
    await channel.assertExchange(exchange.name, exchange.type, { durable: true })

    for (const binding of exchange.bindings) {
      const queueName = `${exchange.name}.${binding.name}`

      const queue = await channel.assertQueue(queueName)

      await channel.bindQueue(queue.queue, exchange.name, binding.key)

      const consumer = binding.consumer(() => container?.cradle)

      channel.consume(queue.queue, async (message) => {
        if (message) {
          const content = message.content.toString()
          const event = JSON.parse(content)

          try {
            await consumer(event)
            channel.ack(message)
          } catch (error) {
            logger.error(error, 'Error processing message in queue %s', queueName)
            channel.nack(message, false, false)
          }
        }
      })

      logger.info('Setup queue "%s" with key \'%s\'', queueName, binding.key)
    }
  }
}
