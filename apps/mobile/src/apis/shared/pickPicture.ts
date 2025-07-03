import { Camera, CameraResultType, CameraSource, type ImageOptions } from '@capacitor/camera'
import { isBrowser } from '../browser/pickPicture/utils/platformDetection'
import { isMobile } from '../mobile/pickPicture/utils/platformDetection'
import { pickFileFromBrowser } from '../browser/pickPicture/utils/filePicker'
import {
  defaultBrowserOptions,
  type TBrowserFileOptions,
} from '../../types/apis/browser/pickPicturebrowser.types'
import type { TPickPictureOptions } from '../../types/apis/mobile/pickPicture.types'
import { defaultMobileOptions, type TPickPictureResult } from '../../types/apis/shared.apis.types'
import { PickPictureError } from '../../classes/PickPictureError'
import { handleCameraError } from '../mobile/pickPicture/utils'

/**
 * Main function to pick a picture from camera or gallery
 * Automatically selects the appropriate method based on platform
 * @param options Configuration options for image selection
 * @returns Promise resolving to the selected image result
 */

export async function pickPicture(
  mobileOptions: TPickPictureOptions = defaultMobileOptions,
  browserOptions: TBrowserFileOptions = defaultBrowserOptions,
): Promise<TPickPictureResult> {
  let results: TPickPictureResult = {
    webPath: '',
    dataUrl: '',
    format: 'unknown',
    saved: false,
  }
  try {
    if (isBrowser()) {
      results = await pickFileFromBrowser(browserOptions)
    }

    if (isMobile()) {
      let source: CameraSource
      if (mobileOptions.allowCamera && mobileOptions.allowGallery) {
        source = CameraSource.Prompt // Let user choose
      } else if (mobileOptions.allowCamera) {
        source = CameraSource.Camera
      } else if (mobileOptions.allowGallery) {
        source = CameraSource.Photos
      } else {
        throw new PickPictureError('UNKNOWN_ERROR', 'No valid image source specified')
      }
      const imageOptions: ImageOptions = {
        quality: mobileOptions.quality || 85,
        resultType: CameraResultType.Uri,
        source,
        width: mobileOptions.maxWidth,
        height: mobileOptions.maxHeight,
        allowEditing: mobileOptions.allowEditing || true,
      }
      const image = await Camera.getPhoto(imageOptions)
      if (!image || !image.webPath) {
        throw new PickPictureError('USER_CANCELLED', 'No image selected')
      }
      results = {
        webPath: image.webPath,
        dataUrl: image.dataUrl,
        format: image.format,
        saved: image.saved,
      }
    }
    return results
  } catch (error: unknown) {
    handleCameraError(error)
  }
}
