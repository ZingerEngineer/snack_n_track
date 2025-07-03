import type { TPickPictureOptions } from './mobile/pickPicture.types'

export type TPickPictureResult = {
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

// === Constants and Default Options ===

// Default options optimized for food scanning
export const defaultMobileOptions: TPickPictureOptions = {
  allowGallery: true,
  allowCamera: true,
  quality: 85, // Balanced quality for food recognition
  allowEditing: true,
  maxWidth: 640, // Reasonable size for processing
  maxHeight: 640,
  correctOrientation: true,
  acceptTypes: ['image/jpeg', 'image/png', 'image/webp'],
  multiple: false,
}
