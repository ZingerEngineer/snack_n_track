import { fileTypeFromBuffer } from 'file-type'

/**
 * Enhanced security validation for image files using binary signature detection
 * This prevents file type spoofing by examining the actual file content
 * @param file - The file to validate
 * @returns Promise<boolean> - True if file is a valid image for compression
 */
export async function isValidImageFile(file: File): Promise<boolean> {
  const maxFileSize = 50 * 1024 * 1024 // 50MB max

  // Basic size check first
  if (file.size <= 0 || file.size > maxFileSize) {
    console.warn('File size validation failed:', {
      size: file.size,
      maxSize: maxFileSize,
    })
    return false
  }

  try {
    // Read the first chunk of the file to detect its type by binary signature
    const chunkSize = Math.min(4100, file.size) // Read enough bytes for detection
    const buffer = await file.slice(0, chunkSize).arrayBuffer()
    const uint8Array = new Uint8Array(buffer)

    // Use file-type library to detect the real file type
    const detectedType = await fileTypeFromBuffer(uint8Array)

    if (!detectedType) {
      console.warn('Could not detect file type from binary signature')
      return false
    }

    // Define allowed image types with their expected extensions
    const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

    // Validate the detected MIME type
    const isValidType = allowedTypes.has(detectedType.mime)

    if (!isValidType) {
      console.warn('Invalid image type detected:', {
        detectedMime: detectedType.mime,
        detectedExt: detectedType.ext,
        declaredType: file.type,
        fileName: file.name,
      })
      return false
    }

    // Additional security: Check if declared type matches detected type
    // Allow some flexibility for common MIME type variations
    const declaredType = file.type.toLowerCase()
    const detectedMime = detectedType.mime.toLowerCase()

    const isTypeConsistent =
      declaredType === detectedMime ||
      (declaredType === 'image/jpg' && detectedMime === 'image/jpeg') ||
      (declaredType === 'image/jpeg' && detectedMime === 'image/jpeg')

    if (!isTypeConsistent) {
      console.warn('File type mismatch detected - potential security risk:', {
        declared: declaredType,
        detected: detectedMime,
        fileName: file.name,
      })
      // For security, we could be strict here, but for UX we'll allow it if detected type is valid
      // return false
    }

    console.log('File validation successful:', {
      fileName: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      detectedType: detectedType.mime,
      declaredType: file.type,
    })

    return true
  } catch (error) {
    console.error('File validation failed:', error)
    return false
  }
}

/**
 * Legacy synchronous validation function for backward compatibility
 * Note: This is less secure as it only checks MIME type, not binary signature
 * @param file - The file to validate
 * @returns boolean - True if file appears to be a valid image
 * @deprecated Use isValidImageFile instead for enhanced security
 */
export function isValidImageFileSync(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const maxFileSize = 50 * 1024 * 1024 // 50MB max

  return validTypes.includes(file.type) && file.size <= maxFileSize && file.size > 0
}
