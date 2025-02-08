import { Page } from 'puppeteer'
import { NotFoundError } from '../../classes/Error' // Adjust the import according to your error library

async function uploadImageToGPT(page: Page, imageURL: string): Promise<void> {
  const inputUploadHandle = await page.$('input[class="hidden"]')
  if (!inputUploadHandle) {
    throw new NotFoundError('File input element not found')
  }

  await inputUploadHandle.uploadFile(imageURL)
}

export default uploadImageToGPT

