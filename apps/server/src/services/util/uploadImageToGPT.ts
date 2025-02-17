import { Page } from 'puppeteer'
import { NotFoundError } from '../../classes/Error' // Adjust the import according to your error library

// async function uploadImageToGPT(page: Page, imageURL: string): Promise<void> {
//   const inputUploadHandle = await page.$('input[class="hidden"]')
//   if (!inputUploadHandle) {
//     throw new NotFoundError('File input element not found')
//   }

//   await inputUploadHandle.uploadFile(imageURL)
// }

async function uploadImageToGPT(page: Page, imageURL: string): Promise<void> {
  try {
    const fileInput = await page.waitForSelector(
      'input[type="file"], input[class="hidden"]',
      {
        timeout: 7000
      }
    )

    if (!fileInput) {
      throw new NotFoundError('File input not found')
    }

    await fileInput.uploadFile(imageURL)
  } catch (error) {
    throw new NotFoundError('Image upload failed')
  }
}

export default uploadImageToGPT

