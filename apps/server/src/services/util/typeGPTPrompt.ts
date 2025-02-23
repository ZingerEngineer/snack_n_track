import { Page } from 'puppeteer'

async function typeGPTPrompt(page: Page, prompt: string) {
  await page.waitForSelector('textarea', {
    visible: true
  })
  // Type and send the prompt
  await page.type('textarea', prompt)
}

export default typeGPTPrompt

