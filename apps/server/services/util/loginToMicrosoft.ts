import { ValidationError } from '../../classes/Error'
import { Page } from 'puppeteer'

const loginToMicrosoft = async (
  email: string,
  password: string,
  puppeteerPage: Page
) => {
  try {
    await puppeteerPage.waitForSelector(
      'input[type="email"], input[type="password"]',
      {
        visible: true
      }
    )

    // Enter email address
    await puppeteerPage.type('input[type="email"]', email)
    await puppeteerPage.keyboard.press('Enter')

    // Wait for password input
    await puppeteerPage.waitForSelector('input[type="password"]', {
      visible: true
    })
    await puppeteerPage.type('input[type="password"]', password)
    await puppeteerPage.keyboard.press('Enter')

    await puppeteerPage.waitForNavigation({
      waitUntil: 'networkidle0'
    })
    await puppeteerPage.click('button[id="declineButton"]')
  } catch (error) {
    throw new ValidationError('Error while logging in to Microsoft')
  }
}

export default loginToMicrosoft

