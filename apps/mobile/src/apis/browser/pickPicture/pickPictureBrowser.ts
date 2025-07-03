import type { TPickPictureResult } from '../../../types/apis/shared.apis.types'
import {
  type TBrowserFileOptions,
  defaultBrowserOptions,
} from '../../../types/apis/browser/pickPicturebrowser.types'
import { handleFileSelection } from './utils/fileSelectionHandler'

/**
 * Pick file using an existing HTML input element (for UI integration)
 * @param inputElement HTML input element to use for file selection
 * @param options Browser file options
 * @returns Pick picture result
 */
export async function pickFileWithElement(
  inputElement: HTMLInputElement,
  options: TBrowserFileOptions = defaultBrowserOptions,
): Promise<TPickPictureResult> {
  // Ensure input element is properly configured
  try {
    inputElement.type = 'file'
    inputElement.accept = options.acceptTypes?.join(',') || 'image/*'
    inputElement.multiple = options.multiple || false

    const result = await handleFileSelection(inputElement.files, options)
    return result
  } catch (error) {
    throw new Error(
      `File selection failed: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
