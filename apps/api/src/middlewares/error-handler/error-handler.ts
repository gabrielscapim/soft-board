import { ErrorRequestHandler } from 'express'
import { isHttpError } from 'http-errors'
import { ValidationError } from 'yup'
import { AppHttpError, logger } from '../../libs'
import { NotFoundError } from 'pg-script'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof ValidationError) {
    res.status(400).json({
      status: 400,
      title: 'Bad Request',
      errors: err.message
    })
  } else if (isHttpError(err) && err.expose) {
    const error = err as AppHttpError

    res.status(error.status!).json({
      status: error.status,
      title: error.constructor.name,
      detail: error.message,
      code: error.code
    })
  } else if (err instanceof NotFoundError) {
    res.status(404).json({
      status: 404,
      title: 'Not Found',
      detail: err.message || 'Resource not found'
    })
  } else {
    logger.error(err)

    res.status(500).json({
      status: 500,
      title: 'Internal Server Error',
      detail: 'An unexpected error occurred'
    })
  }
}

