import {
  createApp,
  createConsumers,
  getRabbitMQ,
  loadEndpoints,
  loadExchanges,
  loadPublishers,
  loadWebsocketEmitters,
  registerApplicationDependencies
} from './setup'
import { CONSUMERS_DIR, CORS_ORIGINS, ENDPOINTS_DIR, PORT } from './constants'
import { getNodemailerTransport, logger } from './libs'
import { Server } from 'socket.io'
import http from 'http'
import { createContainer } from 'awilix'

/**
 * Application entrypoint.
 */
async function main () {
  logger.info('Starting server')

  const { channel } = await getRabbitMQ()

  const endpoints = await loadEndpoints(ENDPOINTS_DIR)
  const exchanges = await loadExchanges(CONSUMERS_DIR)

  const container = createContainer({ strict: true })

  const app = createApp({ endpoints, container })

  const server = http.createServer(app)

  const io = new Server(server, {
    cors: {
      origin: CORS_ORIGINS,
      credentials: true
    }
  })

  registerApplicationDependencies(
    container,
    {
      publishers: loadPublishers(channel),
      websocketEmitters: loadWebsocketEmitters(io),
      nodemailerTransport: getNodemailerTransport()
    }
  )

  await createConsumers(channel, exchanges, container)

  server.listen(PORT, () => {
    logger.info('Server is running on http://localhost:%s', PORT)
  })

  io.on('connection', socket => {
    logger.info('Client connected: %s', socket.id)

    socket.on('joinBoard', (boardId: string) => {
      socket.join(`board:${boardId}`)
      logger.info('Socket %s joined board %s', socket.id, boardId)
    })

    socket.on('leaveBoard', (boardId: string) => {
      socket.leave(`board:${boardId}`)
      logger.info('Socket %s left board %s', socket.id, boardId)
    })

    socket.on('disconnect', () => {
      logger.info('Client disconnected: %s', socket.id)
    })
  })
}

main()
