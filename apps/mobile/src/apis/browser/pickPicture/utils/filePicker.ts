import type { TPickPictureResult } from '../../../../types/apis/shared.apis.types'
import {
  type TBrowserFileOptions,
  defaultBrowserOptions,
} from '../../../../types/apis/browser/pickPicturebrowser.types'
import { handleFileSelection } from './fileSelectionHandler'
import { PickPictureError } from '../../../../classes/PickPictureError'

/**
 * Create a file input element with specified options
 * @param options Browser file selection options
 * @returns Configured HTMLInputElement
 */
function createFileInput(options: TBrowserFileOptions): HTMLInputElement {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = options.acceptTypes?.join(',') || 'image/*'
  input.multiple = options.multiple || false
  input.style.display = 'none'
  return input
}

/**
 * Pick file from browser using dynamically created file input
 * @param options Pick picture options
 * @returns Promise resolving to pick picture result
 */
export async function pickFileFromBrowser(
  options: TBrowserFileOptions,
): Promise<TPickPictureResult> {
  return new Promise((resolve, reject) => {
    const browserOptions: TBrowserFileOptions = {
      acceptTypes: options.acceptTypes || defaultBrowserOptions.acceptTypes,
      multiple: options.multiple || defaultBrowserOptions.multiple,
      maxSize: defaultBrowserOptions.maxSize,
    }

    const input = createFileInput(browserOptions)

    const cleanup = () => {
      if (input.parentNode) {
        input.remove()
      }
    }

    const handleFileSelectionEvent = async (files: FileList | null) => {
      try {
        const result = await handleFileSelection(files, browserOptions)
        resolve(result)
      } catch (error) {
        reject(error)
      } finally {
        cleanup()
      }
    }

    input.onchange = (event) => {
      const target = event.target as HTMLInputElement
      handleFileSelectionEvent(target.files)
    }

    input.oncancel = () => {
      cleanup()
      reject(new PickPictureError('USER_CANCELLED', 'File selection cancelled'))
    }

    // Handle case where user clicks outside the dialog (some browsers)
    input.onblur = () => {
      // Small delay to check if a file was actually selected
      setTimeout(() => {
        if (!input.files || input.files.length === 0) {
          cleanup()
          reject(new PickPictureError('USER_CANCELLED', 'File selection cancelled'))
        }
      }, 100)
    }

    // Add to DOM and trigger click
    document.body.appendChild(input)
    input.click()
  })
}
