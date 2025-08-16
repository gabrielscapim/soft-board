import { createApp, createConsumers, getRabbitMQ, loadEndpoints, loadExchanges, loadPublishers } from './setup'
import { CONSUMERS_DIR, ENDPOINTS_DIR, PORT } from './constants'
import { logger } from './libs'

/**
 * Application entrypoint.
 */
async function main () {
  logger.info('Starting server')

  const { channel } = await getRabbitMQ()

  const endpoints = await loadEndpoints(ENDPOINTS_DIR)
  const exchanges = await loadExchanges(CONSUMERS_DIR)
  const publishers = loadPublishers(channel)

  for (const exchange of exchanges) {
    channel.assertExchange(exchange.name, exchange.type)
    logger.info('Declared exchange "%s" of type "%s"', exchange.name, exchange.type)
  }

  logger.info('Loaded %d endpoints', endpoints.length)

  const app = createApp({ endpoints, publishers })

  await createConsumers(channel, exchanges)

  app.listen(PORT, (error) => {
    if (error) {
      logger.error(error, 'Error starting server')
      process.exit(1)
    }

    logger.info('Server is running on http://localhost:%s', PORT)
  })
}

main()
