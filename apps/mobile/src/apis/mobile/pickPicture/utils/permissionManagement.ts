import { Camera } from '@capacitor/camera'
import { isBrowser } from '../../../browser/pickPicture/utils/platformDetection'

/**
 * Check if camera permissions are granted
 * @returns Promise resolving to true if permissions are available
 */
export async function checkCameraPermissions(): Promise<boolean> {
  // In browser, we don't need camera permissions for file input
  if (isBrowser()) {
    return true
  }

  try {
    const permissions = await Camera.checkPermissions()
    return permissions.camera === 'granted' || permissions.camera === 'limited'
  } catch (error) {
    console.error('Error checking camera permissions:', error)
    return false
  }
}

/**
 * Request camera permissions
 * @returns Promise resolving to true if permissions were granted
 */
export async function requestCameraPermissions(): Promise<boolean> {
  // In browser, we don't need camera permissions for file input
  if (isBrowser()) {
    return true
  }

  try {
    const permissions = await Camera.requestPermissions({ permissions: ['camera', 'photos'] })
    return permissions.camera === 'granted' || permissions.camera === 'limited'
  } catch (error) {
    console.error('Error requesting camera permissions:', error)
    return false
  }
}
