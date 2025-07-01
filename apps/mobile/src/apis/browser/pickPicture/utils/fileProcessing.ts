import type { IPickPictureResult } from '../../../mobile/pickPicture/pickPicture'
import type { IBrowserFileOptions } from '../types'
import { validateFile } from './fileValidation'

/**
 * Convert File to data URL for display
 * @param file File to convert
 * @returns Promise resolving to data URL string
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Process selected file and return result
 * @param file File to process
 * @param options Processing options
 * @returns Promise resolving to pick picture result
 */
export async function processSelectedFile(
  file: File,
  options: IBrowserFileOptions,
): Promise<IPickPictureResult> {
  await validateFile(file, options)

  const dataUrl = await fileToDataUrl(file)
  const webPath = URL.createObjectURL(file)

  return {
    webPath,
    dataUrl,
    format: file.type.split('/')[1] || 'unknown',
    saved: false,
    file,
  }
}
