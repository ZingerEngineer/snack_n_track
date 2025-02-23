import { InternalServerError } from '../../classes/Error'
import { Page } from 'puppeteer'

const debouncedCheckingUpload = async (page: Page) => {
  try {
    console.log('Starting debouncedCheckingUpload')
    await page.evaluate(async () => {
      const keepCheckingUploadingCircles = async (
        circlesNumber: number,
        milliseconds: number,
        retries: number
      ) => {
        try {
          console.log(`Checking for circles, retries left: ${retries}`)
          let circles = document.querySelectorAll('circle')
          console.log(`Found ${circles.length} circles`)
          if (circles.length > circlesNumber) {
            if (retries > 0) {
              await new Promise((resolve) => setTimeout(resolve, milliseconds))
              return keepCheckingUploadingCircles(
                circlesNumber,
                milliseconds,
                retries - 1
              )
            } else {
              throw new Error('Max retries reached')
            }
          }
        } catch (error) {
          console.error('Error in keepCheckingUploadingCircles:', error)
          throw error
        }
      }

      return keepCheckingUploadingCircles(2, 2000, 30)
    })
    console.log('Finished debouncedCheckingUpload')
  } catch (error) {
    console.error('Error in debouncedCheckingUpload:', error)
    throw new InternalServerError('Error in debouncedCheckingUpload')
  }
}

// const debouncedCheckingUpload = async (page: Page) => {
//   try {
//     await page.evaluate(async () => {
//       let stableCount = 0
//       const maxStableChecks = 3
//       const maxRetries = 15

//       for (let i = 0; i < maxRetries; i++) {
//         const circles = document.querySelectorAll('circle')

//         if (circles.length <= 2) {
//           stableCount++
//           if (stableCount >= maxStableChecks) {
//             return true
//           }
//         } else {
//           stableCount = 0
//         }

//         await new Promise((resolve) => setTimeout(resolve, 1000))
//       }

//       throw new Error('Upload check timeout')
//     })
//   } catch (error) {
//     throw new InternalServerError('Upload verification failed')
//   }
// }
export default debouncedCheckingUpload

