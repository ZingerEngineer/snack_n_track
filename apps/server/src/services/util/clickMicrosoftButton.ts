import { NotFoundError } from '../../classes/Error'
import { Page } from 'puppeteer'

// async function clickMicrosoftButton(page: Page): Promise<void> {
//   try {
//     await page.waitForSelector('.social-btn', { visible: true })
//     await page.evaluate(() => {
//       const microsoftButton = Array.from(
//         document.getElementsByTagName('IMG')
//       ).filter((img) => (img as HTMLImageElement).src.includes('microsoft'))[0]
//         ?.parentElement?.parentElement as HTMLButtonElement
//       if (microsoftButton) microsoftButton.click()
//     })
//   } catch (error) {
//     throw new NotFoundError('Microsoft button not found')
//   }
// }

async function clickMicrosoftButton(page: Page): Promise<void> {
  try {
    // Add timeout and increase precision with specific selector
    await page.waitForSelector('button img[src*="microsoft"]', {
      visible: true,
      timeout: 10000
    })
    await page.click('button img[src*="microsoft"]')
  } catch (error) {
    throw new NotFoundError('Microsoft button not found or not clickable')
  }
}
export default clickMicrosoftButton

