import { ValidationError } from '../classes/Error'
import sanitize from 'sanitize-filename'
import { FileUploadSchema } from '../schemas/file.zod'
import { TUploadedFile } from './file/file.types'
/**
 * Validates uploaded file meets security and format requirements
 * @param file Express multer file object
 * @returns Validated file object
 * @throws ValidationError if file is invalid
 */
export function validateUploadedFile(
  file: Express.Multer.File | undefined
): TUploadedFile {
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

