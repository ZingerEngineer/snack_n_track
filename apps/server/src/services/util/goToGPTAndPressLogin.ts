import { InternalServerError } from '../../classes/Error'
import { Page } from 'puppeteer'

async function goToGPTAndPressLogin(page: Page): Promise<void> {
  try {
    // Navigate to ChatGPT login page
    await page.goto('https://chat.openai.com')
    console.log('Navigated to ChatGPT login page')
    await page.waitForNavigation({ waitUntil: 'networkidle0' })
    console.log('Waited for navigation')
    // Login handling

    const buttonElement = await Promise.race([
      page.waitForSelector('button.btn-primary[data-testid="login-button"]', {
        visible: true
      }),
      page.waitForSelector(
        'button[class="btn relative btn-primary btn-small"]',
        {
          visible: true
        }
      )
    ])
    console.log('Waited for login button')
    console.log('buttonElement', buttonElement)
    await Promise.race([
      page.click('button.btn-primary[data-testid="login-button"]'),
      page.click('button[class="btn relative btn-primary btn-small"]')
    ])
    console.log('Clicked on login button')
  } catch (error) {
    throw new InternalServerError(
      'Error while navigating to ChatGPT login page'
    )
  }
}

// async function goToGPTAndPressLogin(page: Page): Promise<void> {
//   try {
//     await Promise.all([
//       page.goto('https://chat.openai.com', {
//         waitUntil: 'networkidle0'
//       }),
//       page.waitForSelector('button[data-testid="login-button"]', {
//         visible: true
//       })
//     ])

//     await page.click('button[data-testid="login-button"]')
//   } catch (error) {
//     throw new InternalServerError('Failed to load ChatGPT login page')
//   }
// }

export default goToGPTAndPressLogin

