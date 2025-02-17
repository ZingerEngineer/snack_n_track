import { Request, Response, NextFunction } from 'express'
import { BaseError } from '../classes/Error' // Import your custom error classes

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error (e.g., to console or a logging service)
  console.error(err)

  if (err instanceof BaseError) {
    res.status(err.statusCode).json({
      error: err.message
    })
    console.log('Instance of BaseError')
  } else {
    console.log('Not an instance of BaseError')
    // Swallow unexpected errors and prevent app crash
    res.status(500).json({
      error: 'An unexpected error occurred'
    })
  }
}

export default errorHandler

