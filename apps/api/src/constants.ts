import path from 'path'

export const AUTHENTICATION_COOKIE_NAME = 'soft-board-auth'

export const CONSUMERS_DIR = path.join(__dirname, 'consumers')

export const CORS_ORIGINS = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['*']

export const COOKIE_PARSER_SECRET = process.env.COOKIE_PARSER_SECRET

export const ENDPOINTS_DIR = path.join(__dirname, 'endpoints')

export const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL!

export const NODE_ENV = process.env.NODE_ENV || 'development'

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export const PASSWORD_SALT_ROUNDS = 12

export const PORT = process.env.PORT || 3000

export const RABBIT_URL = process.env.RABBIT_URL!

export const SMTP_HOST = process.env.SMTP_HOST

export const SMTP_PORT = Number(process.env.SMTP_PORT)

export const SMTP_SECURE = process.env.SMTP_SECURE === 'true'

export const SMTP_USER = process.env.SMTP_USER

export const SMTP_PASSWORD = process.env.SMTP_PASSWORD
