import type { IPickPictureResult } from '../../../mobile/pickPicture/types'
import type { IBrowserFileOptions } from '../types'
import { DEFAULT_BROWSER_OPTIONS } from '../types'
import { handleFileSelection } from './fileSelectionHandler'
import { PickPictureError } from '../../../mobile/pickPicture/types'

interface IPickFileOptions {
  acceptTypes?: string[]
  multiple?: boolean
  [key: string]: unknown
}

/**
 * Create a file input element with specified options
 * @param options Browser file selection options
 * @returns Configured HTMLInputElement
 */
function createFileInput(options: IBrowserFileOptions): HTMLInputElement {
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
export async function pickFileFromBrowser(options: IPickFileOptions): Promise<IPickPictureResult> {
  return new Promise((resolve, reject) => {
    const browserOptions: IBrowserFileOptions = {
      acceptTypes: options.acceptTypes || DEFAULT_BROWSER_OPTIONS.acceptTypes,
      multiple: options.multiple || DEFAULT_BROWSER_OPTIONS.multiple,
      maxSize: DEFAULT_BROWSER_OPTIONS.maxSize,
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
