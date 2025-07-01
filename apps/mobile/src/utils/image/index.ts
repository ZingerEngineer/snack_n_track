// Image compression utilities
export { compressImage } from './imageCompressor'

// Compression configuration and presets
export {
  DEFAULT_COMPRESSION_OPTIONS,
  COMPRESSION_PRESETS,
  getRecommendedCompressionOptions,
} from './compressionConfig'

// File validation utilities
export { isValidImageFile, isValidImageFileSync } from './fileValidator'

// URL and blob utilities
export {
  createCompressedImageUrl,
  createImageUrl,
  revokeImageUrl,
  blobUrlToFile,
} from './urlHelpers'

// Re-export types for convenience
export type {
  IImageCompressionOptions,
  IImageCompressionResult,
  IImageValidationResult,
  IImageSecurityOptions,
  IScanImageState,
} from './types'
