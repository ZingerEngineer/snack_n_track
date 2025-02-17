import { ValidationError } from '../../classes/Error'
import { Page } from 'puppeteer'

// const loginToMicrosoft = async (
//   email: string,
//   password: string,
//   puppeteerPage: Page
// ) => {
//   try {
//     await puppeteerPage.waitForSelector(
//       'input[type="email"], input[type="password"]',
//       {
//         visible: true
//       }
//     )

//     // Enter email address
//     await puppeteerPage.type('input[type="email"]', email)
//     await puppeteerPage.keyboard.press('Enter')

//     // Wait for password input
//     await puppeteerPage.waitForSelector('input[type="password"]', {
//       visible: true
//     })
//     await puppeteerPage.type('input[type="password"]', password)
//     await puppeteerPage.keyboard.press('Enter')

//     await puppeteerPage.waitForNavigation({
//       waitUntil: 'networkidle0'
//     })
//     await puppeteerPage.click('button[id="declineButton"]')
//   } catch (error) {
//     throw new ValidationError('Error while logging in to Microsoft')
//   }
// }

const loginToMicrosoft = async (
  email: string,
  password: string,
  page: Page
) => {
  try {
    const selectors = {
      emailInput: 'input[type="email"]',
      passwordInput: 'input[type="password"]',
      declineButton: 'button[id="declineButton"]'
    }

    // Wait for and fill email
    await page.waitForSelector(selectors.emailInput, {
      visible: true,
      timeout: 10000
    })
    await page.type(selectors.emailInput, email, { delay: 50 })
    await page.keyboard.press('Enter')

    // Wait for and fill password
    await page.waitForSelector(selectors.passwordInput, {
      visible: true,
      timeout: 10000
    })
    await page.type(selectors.passwordInput, password, { delay: 50 })
    await page.keyboard.press('Enter')

    // Wait for navigation and decline button
    await Promise.race([
      page.waitForNavigation({
        waitUntil: 'networkidle0',
        timeout: 15000
      }),
      page.waitForSelector(selectors.declineButton, {
        visible: true,
        timeout: 15000
      })
    ])

    const declineButton = await page.$(selectors.declineButton)
    if (declineButton) {
      await declineButton.click()
    }
  } catch (error) {
    throw new ValidationError('Microsoft login failed')
  }
}

export default loginToMicrosoft

