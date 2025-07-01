import { PickPictureError } from '../../../mobile/pickPicture/pickPicture'
import type { IPickPictureResult } from '../../../mobile/pickPicture/pickPicture'
import type { IBrowserFileOptions } from '../types'
import { processSelectedFile } from './fileProcessing'

/**
 * Handle file selection from input element
 * @param files FileList from input element
 * @param options Browser file options
 * @returns Promise resolving to pick picture result
 */
export async function handleFileSelection(
  files: FileList | null,
  options: IBrowserFileOptions,
): Promise<IPickPictureResult> {
  if (!files || files.length === 0) {
    throw new PickPictureError('USER_CANCELLED', 'No file selected')
  }

  const file = files[0]
  console.log('Selected file:', file)
  try {
    console.log('Selected file success:', file)

    return await processSelectedFile(file, options)
  } catch (error) {
    if (error instanceof PickPictureError) {
      throw error
    }
    throw new PickPictureError('UNKNOWN_ERROR', 'Failed to process selected file', error)
  }
}
