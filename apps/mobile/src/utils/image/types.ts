// Image compression and validation types
// This file contains types specifically for image processing, compression, and security validation

// Image compression types and configuration
export interface IImageCompressionOptions {
  maxSizeMB: number
  maxWidthOrHeight: number
  useWebWorker: boolean
  quality: number
  initialQuality: number
  alwaysKeepResolution: boolean
  fileType?: string
}

export interface IImageCompressionResult {
  originalFile: File
  compressedFile: File
  originalSize: number
  compressedSize: number
  compressionRatio: number
}

// Security validation types
export interface IImageValidationResult {
  isValid: boolean
  detectedMimeType?: string
  detectedExtension?: string
  declaredMimeType?: string
  fileSize: number
  securityWarnings?: string[]
}

export interface IImageSecurityOptions {
  maxFileSize: number
  allowedMimeTypes: string[]
  strictTypeMatching: boolean
  logSecurityWarnings: boolean
}

// Scan store image-related types
export interface IScanImageState {
  imagePath: string | null
  isImagePathSet: boolean
  isCompressing: boolean
  compressionProgress: number
  compressionInfo: IImageCompressionResult | null
  originalImageFile: File | null
}
