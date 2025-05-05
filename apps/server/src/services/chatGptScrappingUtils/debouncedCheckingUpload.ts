import { InternalServerError } from '../../classes/Error'
import { Page } from 'puppeteer'

const debouncedCheckingUpload = async (page: Page) => {
  try {
    console.log('Starting debouncedCheckingUpload')
    await page.evaluate(async () => {
      let stableCount = 0
      const maxStableChecks = 3
      const maxRetries = 30
      const interval = 2000

      for (let i = 0; i < maxRetries; i++) {
        const circles = document.querySelectorAll('circle')
        console.log(`Attempt ${i + 1}: found ${circles.length} circles`)
        // Change the threshold as needed. Here we assume that when the number of circles is <= 4, the upload is complete.
        if (circles.length <= 4) {
          stableCount++
          if (stableCount >= maxStableChecks) {
            console.log('Upload complete (stable state reached).')
            return
          }
        } else {
          // Reset the stable count if the upload indicator reappears
          stableCount = 0
        }
        await new Promise((resolve) => setTimeout(resolve, interval))
      }
      throw new Error('Upload did not complete in the expected time')
    })
    console.log('Finished debouncedCheckingUpload')
  } catch (error) {
    console.error('Error in debouncedCheckingUpload:', error)
    throw new InternalServerError('Error in debouncedCheckingUpload')
  }
}

export default debouncedCheckingUpload

