import type { IPickPictureResult } from '../../mobile/pickPicture/pickPicture'
import type { IBrowserFileOptions } from './types'
import { DEFAULT_BROWSER_OPTIONS } from './types'
import { handleFileSelection } from './utils'

// Re-export types for external use
export type { IBrowserFileOptions } from './types'

/**
 * Pick file using an existing HTML input element (for UI integration)
 * @param inputElement HTML input element to use for file selection
 * @param options Browser file options
 * @returns Pick picture result
 */
export async function pickFileWithElement(
  inputElement: HTMLInputElement,
  options: IBrowserFileOptions = DEFAULT_BROWSER_OPTIONS,
): Promise<IPickPictureResult> {
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
