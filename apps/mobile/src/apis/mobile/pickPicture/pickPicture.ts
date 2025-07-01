import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import type { ImageOptions } from '@capacitor/camera'
import { isPlatform } from '@ionic/vue'
import { isBrowser } from '../../browser/pickPicture/utils/platformDetection'
import { pickFileFromBrowser } from '../../browser/pickPicture/utils/filePicker'
import type { IPickPictureOptions, IPickPictureResult } from './types'
import { DEFAULT_OPTIONS, PickPictureError } from './types'
import { handleCameraError, checkCameraPermissions, requestCameraPermissions } from './utils'

// Re-export types for external use
export type { IPickPictureOptions, IPickPictureResult, TPickPictureError } from './types'
export { PickPictureError } from './types'

// Re-export utilities for external use
export { isMobile } from './utils'
export { checkCameraPermissions, requestCameraPermissions }

// === Main Picture Picking Functions ===

/**
 * Main function to pick a picture from camera or gallery
 * Automatically selects the appropriate method based on platform
 * @param options Configuration options for image selection
 * @returns Promise resolving to the selected image result
 */
export async function pickPicture(options: IPickPictureOptions = {}): Promise<IPickPictureResult> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options }

  // If we're in a browser environment, use file input instead of camera
  if (isBrowser()) {
    return pickFileFromBrowser(mergedOptions)
  }

  try {
    // Check if camera is available on the device
    if (!isPlatform('capacitor') && !isPlatform('hybrid')) {
      throw new PickPictureError(
        'CAMERA_UNAVAILABLE',
        'Camera functionality is not available on this platform',
      )
    }

    // Determine source based on options and platform
    let source: CameraSource
    if (mergedOptions.allowCamera && mergedOptions.allowGallery) {
      source = CameraSource.Prompt // Let user choose
    } else if (mergedOptions.allowCamera) {
      source = CameraSource.Camera
    } else if (mergedOptions.allowGallery) {
      source = CameraSource.Photos
    } else {
      throw new PickPictureError('UNKNOWN_ERROR', 'No valid image source specified')
    }

    const imageOptions: ImageOptions = {
      quality: mergedOptions.quality!,
      allowEditing: mergedOptions.allowEditing!,
      resultType: CameraResultType.Uri,
      source,
      correctOrientation: mergedOptions.correctOrientation,
      width: mergedOptions.maxWidth,
      height: mergedOptions.maxHeight,
    }

    const image = await Camera.getPhoto(imageOptions)

    if (!image.webPath) {
      throw new PickPictureError('UNKNOWN_ERROR', 'Failed to get image path from camera')
    }

    return {
      webPath: image.webPath,
      dataUrl: image.dataUrl,
      format: image.format,
      saved: image.saved,
    }
  } catch (error: unknown) {
    handleCameraError(error)
  }
}

// Export convenience functions using the main pickPicture function
export async function takePhoto(
  options: Omit<IPickPictureOptions, 'allowGallery'> = {},
): Promise<IPickPictureResult> {
  // In browser, camera access is limited, so fall back to file input
  if (isBrowser()) {
    console.warn('Camera not available in browser, falling back to file input')
    return pickPicture({
      ...options,
      allowCamera: false,
      allowGallery: true,
    })
  }

  return pickPicture({
    ...options,
    allowCamera: true,
    allowGallery: false,
  })
}

export async function selectFromGallery(
  options: Omit<IPickPictureOptions, 'allowCamera'> = {},
): Promise<IPickPictureResult> {
  return pickPicture({
    ...options,
    allowCamera: false,
    allowGallery: true,
  })
}
