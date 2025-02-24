import { InternalServerError } from '../../classes/Error'
import { IFailureObject } from '../../types/global.types'
import { Page } from 'puppeteer'

async function getJSONResponse(page: Page) {
  console.log('Starting getJSONResponse evaluation...')
  const result = await page.evaluate(async () => {
    console.log('Inside page.evaluate of getJSONResponse.')

    // Function to parse and clean the code block's inner text.
    const parseCodeInnerText = (innerText: string): object | null => {
      try {
        console.log('Parsing inner text from code block.')
        const cleanedText = innerText
          .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '') // Remove comments
          .replace(/[\n\r\t\s]+/g, ' ') // Replace multiple whitespaces with a single space
          .replace(/\\n|\\r|\\t/g, '') // Remove escaped whitespace
          .trim()
        console.log('Cleaned text:', cleanedText)
        if (!cleanedText.startsWith('{') && !cleanedText.startsWith('[')) {
          console.warn(
            'Cleaned text does not start with valid JSON characters. Returning null.'
          )
          return null
        }
        const parsed = JSON.parse(cleanedText)
        console.log('JSON parsed successfully.')
        return parsed
      } catch (err) {
        console.error('Error parsing JSON:', err)
        return null
      }
    }

    // Function to query for the code block element.
    const getCodeDivElement = (): HTMLElement | null => {
      console.log(
        'Querying for code block element with selector "div[class=\'overflow-y-auto p-4\']".'
      )
      const element = document.querySelector(
        'div[class="overflow-y-auto p-4"]'
      ) as HTMLElement | null
      if (!element) {
        console.warn('Code block element not found.')
      } else {
        console.log('Code block element found.')
      }
      return element
    }

    // Recursive function that checks the code block for stable content and then attempts JSON parsing.
    const keepCheckingCodeBlock = async (
      prevLength: number,
      retries: number,
      maxStableChecks: number = 3
    ): Promise<object | IFailureObject | null> => {
      console.log(
        `keepCheckingCodeBlock called with prevLength: ${prevLength}, retries left: ${retries}, stableChecks remaining: ${maxStableChecks}`
      )
      if (retries <= 0) {
        console.error('Retries exhausted. Returning failure object.')
        return { status: 'failed' }
      }

      const codeBlock = getCodeDivElement()
      if (!codeBlock) {
        console.log('No code block found. Waiting 1 second before retrying...')
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return keepCheckingCodeBlock(0, retries - 1, maxStableChecks)
      }

      const currentText = codeBlock.innerText
      const currentLength = currentText.length
      console.log(
        `Current code block length: ${currentLength}, Previous length: ${prevLength}`
      )

      if (currentLength === prevLength) {
        console.log(
          `Content length stable. Decrementing stable checks (remaining: ${maxStableChecks - 1}).`
        )
        maxStableChecks--
        if (maxStableChecks <= 0) {
          console.log(
            'Content has been stable for the required checks. Attempting to parse JSON.'
          )
          const parsed = parseCodeInnerText(currentText)
          if (parsed === null) {
            console.warn('Parsed JSON is null.')
          }
          return parsed
        }
      } else {
        console.log('Content length changed. Resetting stable checks.')
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))
      return keepCheckingCodeBlock(currentLength, retries - 1, maxStableChecks)
    }

    // Add an initial wait before starting to check the divs.
    const initialDelay = 2000
    console.log(
      `Waiting for initial ${initialDelay}ms delay before starting to check the code block...`
    )
    await new Promise((resolve) => setTimeout(resolve, initialDelay))
    console.log(
      'Initial delay completed. Starting to monitor the code block for a stable JSON response...'
    )
    return keepCheckingCodeBlock(0, 15, 3)
  })

  console.log('getJSONResponse evaluation completed with result:', result)
  return result
}

export default getJSONResponse

