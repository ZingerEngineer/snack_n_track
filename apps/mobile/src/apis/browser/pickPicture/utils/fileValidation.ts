import { PickPictureError } from '../../../../classes/PickPictureError'
import { isValidImageFile } from '../../../../utils/image/fileValidator'
import type { TBrowserFileOptions } from '../../../../types/apis/browser/pickPicturebrowser.types'

/**
 * Validate file against specified criteria using the existing file validator
 * @param file File to validate
 * @param options Validation options
 * @throws PickPictureError if validation fails
 */
export async function validateFile(file: File, options: TBrowserFileOptions): Promise<void> {
  // Check if file exists
  if (!file) {
    throw new PickPictureError(
      'INVALID_FILE_TYPE',
      'Invalid file. Please select a valid image file.',
    )
  }

  // Basic type check against acceptTypes if specified
  if (options.acceptTypes && options.acceptTypes.length > 0) {
    const isValidType = options.acceptTypes.some((type: string) => {
      if (type.includes('*')) {
        // Handle wildcards like image/*
        return file.type.startsWith(type.replace('*', ''))
      } else {
        // Exact match
        return file.type === type
      }
    })

    if (!isValidType) {
      throw new PickPictureError(
        'INVALID_FILE_TYPE',
        `Invalid file type. Please select one of: ${options.acceptTypes.join(', ')}`,
      )
    }
  }

  // Use the existing robust file validator for security validation
  const isValid = await isValidImageFile(file)
  if (!isValid) {
    throw new PickPictureError(
      'INVALID_FILE_TYPE',
      'Invalid image file. Please select a valid JPEG, PNG, or WebP image.',
    )
  }

  // Check file size if specified (the validator already checks for 50MB max)
  if (options.maxSize && file.size > options.maxSize) {
    const maxSizeMB = (options.maxSize / 1024 / 1024).toFixed(1)
    const fileSizeMB = (file.size / 1024 / 1024).toFixed(1)
    throw new PickPictureError(
      'FILE_TOO_LARGE',
      `File is too large (${fileSizeMB}MB). Maximum size is ${maxSizeMB}MB`,
    )
  }
}
