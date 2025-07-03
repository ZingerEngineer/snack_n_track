import { Request } from 'express'
import { ValidationError, UnauthorizedError } from '../../classes/Error'
import {
  validateUploadedFile,
  validateRequestParameters
} from '../../utils/fileValidation'
import { RateLimiter } from '../../utils/concurrencyManager'
import UserDAO from '../../daos/user.dao'

const rateLimiter = RateLimiter.getInstance()
const userDao = new UserDAO()

/**
 * Service for handling validation operations in meal scanning
 */
export class MealValidationService {
  /**
   * Validates user authentication and rate limiting
   */
  static async validateUserAndRateLimit(
    req: Request
  ): Promise<{ userId: string; userEmail: string }> {
    // Extract user information from authenticated request
    const userId = (req as any).user?.id
    const userEmail = (req as any).user?.email

    console.debug('[MealValidationService] User context:', {
      userId,
      userEmail
    })

    // Rate limiting check
    if (userId && !rateLimiter.isAllowed(userId)) {
      const remaining = rateLimiter.getRemainingRequests(userId)
      throw new ValidationError(
        `Rate limit exceeded. Try again in ${Math.ceil((remaining.resetTime - Date.now()) / 1000)} seconds.`
      )
    }

    return { userId, userEmail }
  }

  /**
   * Validates request parameters and file upload
   */
  static validateRequestAndFile(req: Request): {
    requestParams: any
    validatedFile: any
  } {
    // Validate and sanitize request parameters
    const requestParams = validateRequestParameters(req)
    console.debug(
      '[MealValidationService] Validated request params:',
      requestParams
    )

    // File validation
    const validatedFile = validateUploadedFile(req.file)
    console.debug('[MealValidationService] File validation successful:', {
      originalname: validatedFile.originalname,
      size: `${(validatedFile.size / 1024 / 1024).toFixed(2)}MB`,
      mimetype: validatedFile.mimetype
    })

    return { requestParams, validatedFile }
  }

  /**
   * Validates user permissions and account status
   */
  static async validateUserPermissions(
    userId: string,
    requestParams: any
  ): Promise<void> {
    // Verify user exists and is active (if userId provided)
    if (requestParams.userId && requestParams.userId !== userId) {
      throw new UnauthorizedError('Cannot scan meals for other users')
    }

    if (userId) {
      const user = await userDao.getUserById(userId)
      if (!user || user.softDelete) {
        throw new UnauthorizedError('User account is not active')
      }
    }
  }
}

