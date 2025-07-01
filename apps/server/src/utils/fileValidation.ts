import { Request } from 'express'
import { TFileUpload, FileUploadSchema } from '../schemas/meal/scanMeal.zod'
import { ValidationError } from '../classes/Error'
import sanitize from 'sanitize-filename'
import uuid4 from 'uuid'
/**
 * Validates uploaded file meets security and format requirements
 * @param file Express multer file object
 * @returns Validated file object
 * @throws ValidationError if file is invalid
 */
export function validateUploadedFile(
  file: Express.Multer.File | undefined
): TFileUpload {
  if (!file) {
    throw new ValidationError('No file provided in request')
  }

  try {
    // Validate file using Zod schema
    const validatedFile = FileUploadSchema.parse({
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      filename: file.filename,
      path: file.path
    })

    console.log('[FileValidator] File validation successful:', {
      originalname: validatedFile.originalname,
      mimetype: validatedFile.mimetype,
      size: `${(validatedFile.size / 1024 / 1024).toFixed(2)}MB`,
      filename: validatedFile.filename
    })

    return validatedFile
  } catch (error) {
    console.error('[FileValidator] File validation failed:', error)
    throw new ValidationError(
      error instanceof Error ? error.message : 'Invalid file format or size'
    )
  }
}

/**
 * Sanitizes file name to prevent path traversal attacks
 * @param filename Original filename
 * @returns Sanitized filename
 */
export function sanitizeFileName(filename: string): string {
  return sanitize(filename)
}

/**
 * Validates request body parameters
 * @param req Express request object
 * @returns Validated request parameters
 */
export function validateRequestParameters(req: Request): {
  userId?: string
  mealName?: string
  mealType?: string
  saveToHistory?: boolean
} {
  const { userId, mealName, mealType, saveToHistory } = req.body

  // Basic validation and sanitization
  const params: any = {}

  if (userId) {
    if (typeof userId !== 'string' || !uuid4.validate(userId)) {
      throw new ValidationError('Invalid user ID format')
    }
    params.userId = userId
  }

  if (mealName) {
    if (typeof mealName !== 'string' || mealName.length > 200) {
      throw new ValidationError('Invalid meal name')
    }
    params.mealName = mealName.trim()
  }

  if (mealType) {
    const validMealTypes = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'OTHER']
    if (!validMealTypes.includes(mealType)) {
      throw new ValidationError('Invalid meal type')
    }
    params.mealType = mealType
  }

  if (saveToHistory !== undefined) {
    params.saveToHistory = Boolean(saveToHistory)
  }

  return params
}

