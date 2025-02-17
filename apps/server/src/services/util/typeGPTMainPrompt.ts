import { Page } from 'puppeteer'

async function typeGPTMainPrompt(page: Page, mainPrompt: string) {
  await page.waitForSelector('textarea', {
    visible: true,
    timeout: 7000
  })
  // Type and send the prompt
  await page.type('textarea', mainPrompt)
}

export default typeGPTMainPrompt

