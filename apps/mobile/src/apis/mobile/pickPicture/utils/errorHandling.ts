import { PickPictureError } from '../../../../classes/PickPictureError'

/**
 * Handle Capacitor camera errors and convert to PickPictureError
 * @param error The error from camera operations
 * @throws PickPictureError with appropriate type and message
 */
export function handleCameraError(error: unknown): never {
  console.error('Error picking picture:', error)

  const errorObj = error as { message?: string; code?: string }

  // Handle specific Capacitor camera errors
  if (errorObj?.message?.includes('User cancelled') || errorObj?.code === 'userCancelled') {
    throw new PickPictureError('USER_CANCELLED', 'User cancelled image selection', error)
  }

  if (errorObj?.message?.includes('Permission denied') || errorObj?.code === 'permissionDenied') {
    throw new PickPictureError(
      'PERMISSION_DENIED',
      'Camera permission denied. Please enable camera access in your device settings.',
      error,
    )
  }

  if (errorObj?.message?.includes('Camera unavailable') || errorObj?.code === 'cameraUnavailable') {
    throw new PickPictureError(
      'CAMERA_UNAVAILABLE',
      'Camera is not available on this device',
      error,
    )
  }

  if (error instanceof PickPictureError) {
    throw error
  }

  // Unknown error
  throw new PickPictureError(
    'UNKNOWN_ERROR',
    `Failed to pick picture: ${errorObj?.message || 'Unknown error'}`,
    error,
  )
}
