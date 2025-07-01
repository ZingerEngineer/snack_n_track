import { isBrowser } from '../../../browser/pickPicture/utils/platformDetection'
import type { IPickPictureOptions, IPickPictureResult } from '../types'

/**
 * Convenience function for quick photo taking (camera only)
 * Falls back to file input in browser environments
 * @param options Configuration options (excludes allowGallery)
 * @param pickPictureFunction The main pickPicture function
 * @returns Promise resolving to the captured image result
 */
export async function takePhoto(
  options: Omit<IPickPictureOptions, 'allowGallery'> = {},
  pickPictureFunction: (options?: IPickPictureOptions) => Promise<IPickPictureResult>,
): Promise<IPickPictureResult> {
  // In browser, camera access is limited, so fall back to file input
  if (isBrowser()) {
    console.warn('Camera not available in browser, falling back to file input')
    return pickPictureFunction({
      ...options,
      allowCamera: false,
      allowGallery: true,
    })
  }

  return pickPictureFunction({
    ...options,
    allowCamera: true,
    allowGallery: false,
  })
}

/**
 * Convenience function for gallery selection only
 * @param options Configuration options (excludes allowCamera)
 * @param pickPictureFunction The main pickPicture function
 * @returns Promise resolving to the selected image result
 */
export async function selectFromGallery(
  options: Omit<IPickPictureOptions, 'allowCamera'> = {},
  pickPictureFunction: (options?: IPickPictureOptions) => Promise<IPickPictureResult>,
): Promise<IPickPictureResult> {
  return pickPictureFunction({
    ...options,
    allowCamera: false,
    allowGallery: true,
  })
}
