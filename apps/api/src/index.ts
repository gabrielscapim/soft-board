import { createApp, createConsumers, getRabbitMQ, loadEndpoints, loadExchanges, loadPublishers, loadWebsocketEmitters } from './setup'
import { CONSUMERS_DIR, ENDPOINTS_DIR, PORT } from './constants'
import { logger } from './libs'
import { Server } from 'socket.io'
import http from 'http'

/**
 * Application entrypoint.
 */
async function main () {

  logger.info('Starting server')

  const { channel } = await getRabbitMQ()

  const endpoints = await loadEndpoints(ENDPOINTS_DIR)
  const exchanges = await loadExchanges(CONSUMERS_DIR)
  const publishers = loadPublishers(channel)

  // Create the app initially without websocket emitters
  const app = createApp({ endpoints, publishers })

  // Create HTTP server
  const server = http.createServer(app)

  // Create Socket.IO server
  const io = new Server(server, {
    cors: { origin: '*' }
  })

  // Load websocket emitters
  const websocketEmitters = loadWebsocketEmitters(io)

  // Re-create the app with websocket emitters
  createApp({
    endpoints,
    publishers,
    emitters: websocketEmitters
  })

  await createConsumers(channel, exchanges)

  server.listen(PORT, () => {
    logger.info('Server is running on http://localhost:%s', PORT)
  })

  io.on('connection', socket => {
    logger.info('Client connected: %s', socket.id)

    socket.on('disconnect', () => {
      logger.info('Client disconnected: %s', socket.id)
    })
  })
}

main()
