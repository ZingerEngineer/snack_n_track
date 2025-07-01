// === Type Definitions ===

export interface IPickPictureOptions {
  allowGallery?: boolean
  allowCamera?: boolean
  quality?: number
  allowEditing?: boolean
  maxWidth?: number
  maxHeight?: number
  correctOrientation?: boolean
  // Browser-specific options
  acceptTypes?: string[]
  multiple?: boolean
}

export interface IPickPictureResult {
  webPath: string | undefined
  dataUrl?: string
  format: string
  saved: boolean
  file?: File // For browser file uploads
}

export type TPickPictureError =
  | 'USER_CANCELLED'
  | 'PERMISSION_DENIED'
  | 'CAMERA_UNAVAILABLE'
  | 'NO_CAMERA'
  | 'FILE_TOO_LARGE'
  | 'INVALID_FILE_TYPE'
  | 'UNKNOWN_ERROR'

export class PickPictureError extends Error {
  constructor(
    public type: TPickPictureError,
    message: string,
    public originalError?: unknown,
  ) {
    super(message)
    this.name = 'PickPictureError'
  }
}

// === Constants and Default Options ===

// Default options optimized for food scanning
export const DEFAULT_OPTIONS: IPickPictureOptions = {
  allowGallery: true,
  allowCamera: true,
  quality: 85, // Balanced quality for food recognition
  allowEditing: true,
  maxWidth: 1920, // Reasonable size for processing
  maxHeight: 1920,
  correctOrientation: true,
  acceptTypes: ['image/jpeg', 'image/png', 'image/webp'],
  multiple: false,
}
