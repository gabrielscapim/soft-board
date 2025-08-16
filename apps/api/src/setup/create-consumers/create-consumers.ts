import { Exchange } from '../../types'
import { logger } from '../../libs'
import { Channel } from 'amqplib'

export async function createConsumers (
  channel: Channel,
  exchanges: Exchange[]
): Promise<void> {
  for (const exchange of exchanges) {
    for (const binding of exchange.bindings) {
      const queueName = `${exchange.name}.${binding.name}`

      const queue = await channel.assertQueue(queueName)

      await channel.bindQueue(queue.queue, exchange.name, binding.key)

      // Add awilix container as deps
      const consumer = binding.consumer({})

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
