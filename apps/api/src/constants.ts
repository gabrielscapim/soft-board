import path from 'path'

export const AUTHENTICATION_COOKIE_NAME = 'flex-board-auth'

export const CORS_ORIGINS = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['*']

export const COOKIE_PARSER_SECRET = process.env.COOKIE_PARSER_SECRET

export const ENDPOINTS_DIR = path.join(__dirname, 'endpoints')

export const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL!

export const NODE_ENV = process.env.NODE_ENV || 'development'

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export const PASSWORD_SALT_ROUNDS = 12

export const PORT = process.env.PORT || 3000
