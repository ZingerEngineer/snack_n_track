import { Page } from 'puppeteer'
import { NotFoundError } from '../../classes/Error' // Adjust the import according to your error library

async function uploadImageToGPT(page: Page, imageURL: string): Promise<void> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(
      '[uploadImageToGPT] Waiting for file input element using selector: input[type="file"], input[class="hidden"]'
    )

    const fileInput = await page.waitForSelector(
      'input[type="file"], input[class="hidden"]'
    )

    if (!fileInput) {
      console.error('[uploadImageToGPT] File input element not found.')
      throw new NotFoundError('File input not found')
    }

    console.log(
      '[uploadImageToGPT] File input found. Uploading image from URL:',
      imageURL
    )
    await fileInput.uploadFile(imageURL)
    console.log('[uploadImageToGPT] Image uploaded successfully.')
  } catch (error) {
    console.error('[uploadImageToGPT] Error during image upload:', error)
    throw new NotFoundError('Image upload failed')
  }
}

export default uploadImageToGPT

