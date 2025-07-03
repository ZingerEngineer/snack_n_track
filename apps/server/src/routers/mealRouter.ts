import express, { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import {
  scanMealGeminiController,
  scanMealHybridController
} from '../controllers/meal.controller'
import authorizationMiddleware from '../middlewares/authorizationMiddleware'
import {
  ValidationError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError
} from '../classes/Error'
import { ConcurrencyManager } from '../utils/concurrencyManager'

// Extend Request interface to include id property
interface ExtendedRequest extends Request {
  id?: string
}

// Configure multer for secure file upload
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
    files: 1 // Only allow 1 file per request
  },
  fileFilter: (req, file, cb) => {
    // Only allow image files
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new ValidationError('Only JPEG, PNG, and WebP images are allowed'))
    }
  }
})

// Simple rate limiting implementation (in-memory)
class SimpleRateLimit {
  private requests: Map<string, { count: number; resetTime: number }> =
    new Map()

  constructor(
    private windowMs: number,
    private maxRequests: number
  ) {}

  middleware = (): express.RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
      const key = req.ip || 'unknown'
      const now = Date.now()
      const windowData = this.requests.get(key)

      if (!windowData || now > windowData.resetTime) {
        this.requests.set(key, { count: 1, resetTime: now + this.windowMs })
        return next()
      }

      if (windowData.count >= this.maxRequests) {
        res.status(429).json({
          success: false,
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.ceil((windowData.resetTime - now) / 1000)
        })
        return
      }

      windowData.count++
      next()
    }
  }
}

// Rate limiting instances
const scanRateLimit = new SimpleRateLimit(15 * 60 * 1000, 20) // 20 requests per 15 minutes
const globalRateLimit = new SimpleRateLimit(1 * 60 * 1000, 60) // 60 requests per minute
const publicRateLimit = new SimpleRateLimit(30 * 60 * 1000, 5) // 5 requests per 30 minutes

const mealRouter = express.Router()
const concurrencyManager = ConcurrencyManager.getInstance()

// Apply global rate limiting to all routes
mealRouter.use(globalRateLimit.middleware())

// Security headers middleware
mealRouter.use((req: ExtendedRequest, res: Response, next: NextFunction) => {
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Add request ID for tracking
  req.id =
    req.id || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  res.setHeader('X-Request-ID', req.id)

  next()
})

// Request logging middleware
mealRouter.use((req: ExtendedRequest, res: Response, next: NextFunction) => {
  const startTime = Date.now()

  console.info(`[MealRouter] ${req.method} ${req.path}`, {
    requestId: req.id,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    contentLength: req.get('Content-Length'),
    timestamp: new Date().toISOString()
  })

  // Log response time
  res.on('finish', () => {
    const duration = Date.now() - startTime
    console.info(`[MealRouter] Response sent`, {
      requestId: req.id,
      statusCode: res.statusCode,
      duration: `${duration}ms`
    })
  })

  next()
})

/**
 * Enhanced error handling middleware
 */
const handleErrors: express.ErrorRequestHandler = (
  error: Error,
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): void => {
  console.error(`[MealRouter] Error in ${req.method} ${req.path}:`, {
    requestId: req.id,
    error: error.message,
    stack: error.stack,
    userId: (req as any).user?.id
  })

  // Handle specific error types
  if (error instanceof ValidationError) {
    res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: error.message,
      requestId: req.id
    })
    return
  }

  if (error instanceof UnauthorizedError) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: error.message,
      requestId: req.id
    })
    return
  }

  if (error instanceof NotFoundError) {
    res.status(404).json({
      success: false,
      error: 'Not Found',
      message: error.message,
      requestId: req.id
    })
    return
  }

  if (error instanceof InternalServerError) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message,
      requestId: req.id
    })
    return
  }

  // Handle multer errors
  if (error instanceof multer.MulterError) {
    let message = 'File upload error'
    let statusCode = 400

    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        message = 'File too large (max 50MB)'
        break
      case 'LIMIT_FILE_COUNT':
        message = 'Too many files (max 1 file)'
        break
      case 'LIMIT_UNEXPECTED_FILE':
        message = 'Unexpected file field'
        break
      default:
        message = error.message
    }

    res.status(statusCode).json({
      success: false,
      error: 'File Upload Error',
      message,
      requestId: req.id
    })
    return
  }

  // Handle unknown errors
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
    requestId: req.id
  })
}

/**
 * Main meal scanning endpoint with hybrid approach (SnacknTrack + Gemini fallback)
 */
mealRouter.post(
  '/scan',
  scanRateLimit.middleware(), // Apply scan-specific rate limiting
  authorizationMiddleware, // Require authentication
  upload.single('file'), // Handle file upload with security
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      console.info('[MealRouter] POST /scan - Processing hybrid scan request', {
        requestId: req.id,
        userId: (req as any).user?.id
      })

      const response = await scanMealHybridController(req)

      res.status(200).json({
        success: true,
        data: response,
        requestId: req.id,
        timestamp: new Date().toISOString(),
        note: `Processed using ${response.source} with ${response.confidence}% confidence`
      })
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Gemini-only meal scanning endpoint
 */
mealRouter.post(
  '/scan/gemini',
  scanRateLimit.middleware(), // Apply scan-specific rate limiting
  authorizationMiddleware, // Require authentication
  upload.single('file'), // Handle file upload with security
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      console.info(
        '[MealRouter] POST /scan/gemini - Processing Gemini-only scan request',
        {
          requestId: req.id,
          userId: (req as any).user?.id
        }
      )

      const response = await scanMealGeminiController(req)

      res.status(200).json({
        success: true,
        data: response,
        requestId: req.id,
        timestamp: new Date().toISOString(),
        note: 'Processed using Gemini AI analysis'
      })
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Get scan statistics (admin/monitoring endpoint)
 */
mealRouter.get(
  '/stats',
  authorizationMiddleware,
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user

      // Only allow admin users to view stats
      if (user?.role !== 'ADMIN') {
        throw new UnauthorizedError('Admin access required')
      }

      const stats = concurrencyManager.getStats()

      res.status(200).json({
        success: true,
        data: {
          concurrency: stats,
          timestamp: new Date().toISOString(),
          uptime: process.uptime()
        },
        requestId: req.id
      })
    } catch (error) {
      next(error)
    }
  }
)

// Apply error handling middleware
mealRouter.use(handleErrors)

export default mealRouter

