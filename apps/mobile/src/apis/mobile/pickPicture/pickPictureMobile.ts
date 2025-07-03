import type { TPickPictureResult } from '../../../types/apis/shared.apis.types'
import type { TPickPictureOptions } from '../../../types/apis/mobile/pickPicture.types'
import { pickPicture } from '../../shared/pickPicture'

// Export convenience functions using the main pickPicture function
export async function takePhoto(
  options: Omit<TPickPictureOptions, 'allowGallery'> = {},
): Promise<TPickPictureResult> {
  return pickPicture({
    ...options,
    allowCamera: true,
    allowGallery: false,
  })
}

export async function selectFromGallery(
  options: Omit<TPickPictureOptions, 'allowCamera'> = {},
): Promise<TPickPictureResult> {
  return pickPicture({
    ...options,
    allowCamera: false,
    allowGallery: true,
  })
}
