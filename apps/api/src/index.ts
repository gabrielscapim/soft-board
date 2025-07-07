import { createApp, loadEndpoints } from './setup'
import { ENDPOINTS_DIR, PORT } from './constants'
import { logger } from './libs'

/**
 * Application entrypoint.
 */
async function main () {
  logger.info('Starting server')

  const endpoints = await loadEndpoints(ENDPOINTS_DIR)

  logger.info('Loaded %d endpoints', endpoints.length)

  const app = createApp({ endpoints })

  app.listen(PORT, (error) => {
    if (error) {
      logger.error(error, 'Error starting server')
      process.exit(1)
    }

    logger.info('Server is running on http://localhost:%s', PORT)
  })
}

main()
