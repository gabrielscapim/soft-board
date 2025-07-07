import path from 'path'

export const AUTHENTICATION_COOKIE_NAME = 'flex-board-auth'

export const CORS_ORIGINS = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['*']

export const ENDPOINTS_DIR = path.join(__dirname, 'endpoints')

export const PORT = process.env.PORT || 3000
