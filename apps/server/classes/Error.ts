// Base Error Class
class BaseError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    Error.captureStackTrace(this, this.constructor)
  }
}

// Authentication Errors
class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized access') {
    super(message, 401)
  }
}

class ForbiddenError extends BaseError {
  constructor(message = 'Forbidden access') {
    super(message, 403)
  }
}

// Validation Errors
class ValidationError extends BaseError {
  constructor(message = 'Validation failed') {
    super(message, 400)
  }
}

// Not Found Error
class NotFoundError extends BaseError {
  constructor(message = 'Resource not found') {
    super(message, 404)
  }
}

// Server Errors
class InternalServerError extends BaseError {
  constructor(message = 'Internal server error') {
    super(message, 500, false)
  }
}

export {
  BaseError,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
  NotFoundError,
  InternalServerError
}

