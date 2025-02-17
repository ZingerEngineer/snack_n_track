import { InternalServerError } from '../../classes/Error'
import {
  INutritionData,
  IEstimatedNutritionData,
  IFailureObject
} from '../../types/global.types'

import { Page } from 'puppeteer'

// async function getJSONResponse(page: Page) {
//   return await page.evaluate(async () => {
//     function parseCodeInnerText(innerText: string): object | null {
//       try {
//         // Remove comments (lines starting with //) and trim whitespace
//         const cleanedText = innerText
//           .replace(/\/\/.*$/gm, '') // Remove single-line comments
//           .replace(/\n/g, '') // Remove actual newlines for better parsing
//           .replace(/\\n/g, '') // Remove escaped newlines
//           .trim()

//         // Parse the cleaned JSON string
//         const jsonObject = JSON.parse(cleanedText)
//         return jsonObject
//       } catch (error) {
//         return null
//       }
//     }

//     const getCodeDivElement = (): HTMLElement | null => {
//       return (
//         (Array.from(
//           document.querySelectorAll('div[class="overflow-y-auto p-4"]')
//         )[0] as HTMLElement) || null
//       )
//     }

//     const keepCheckingCodeBlock = async (
//       currentCodeLength: number,
//       milliseconds: number,
//       retries: number
//     ) => {
//       if (retries <= 0) {
//         return {
//           status: 'failed'
//         } as IFailureObject
//       }

//       let codeBlock = getCodeDivElement()
//       console.log('codeBlock:', codeBlock)
//       if (!codeBlock) {
//         console.log('Code block did not spawn.')
//         await new Promise((resolve) => setTimeout(resolve, milliseconds))
//         return await keepCheckingCodeBlock(0, milliseconds, retries - 1)
//       }

//       let codeBlockLength = codeBlock.innerText.length
//       if (codeBlockLength !== currentCodeLength) {
//         console.log('Still not finished generating. Waiting...')
//         await new Promise((resolve) => setTimeout(resolve, milliseconds))
//         return await keepCheckingCodeBlock(
//           codeBlockLength,
//           milliseconds,
//           retries - 1
//         )
//       }

//       return parseCodeInnerText(codeBlock.innerText)
//     }

//     return keepCheckingCodeBlock(0, 2000, 20)
//   })
// }

async function getJSONResponse(page: Page) {
  return await page.evaluate(async () => {
    const parseCodeInnerText = (innerText: string): object | null => {
      try {
        // Enhanced cleaning regex
        const cleanedText = innerText
          .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '') // Remove both single-line and multi-line comments
          .replace(/[\n\r\t\s]+/g, ' ') // Replace all whitespace with single space
          .replace(/\\n|\\r|\\t/g, '') // Remove escaped whitespace
          .trim()

        // Basic JSON validation before parsing
        if (!cleanedText.startsWith('{') && !cleanedText.startsWith('[')) {
          return null
        }

        return JSON.parse(cleanedText)
      } catch {
        return null
      }
    }

    const getCodeDivElement = () =>
      document.querySelector(
        'div[class="overflow-y-auto p-4"]'
      ) as HTMLElement | null

    const isContentStable = (
      prevContent: string,
      currentContent: string,
      minLength: number = 10
    ): boolean => {
      // Check if content is long enough and hasn't changed
      return (
        currentContent.length >= minLength && prevContent === currentContent
      )
    }

    const keepCheckingCodeBlock = async (
      prevLength: number,
      retries: number,
      maxStableChecks: number = 3
    ): Promise<object | IFailureObject | null> => {
      if (retries <= 0) return { status: 'failed' } as IFailureObject

      const codeBlock = getCodeDivElement()
      if (!codeBlock) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return keepCheckingCodeBlock(0, retries - 1, maxStableChecks)
      }

      const currentLength = codeBlock.innerText.length
      if (currentLength === prevLength) {
        maxStableChecks--
        if (maxStableChecks <= 0) {
          return parseCodeInnerText(codeBlock.innerText)
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))
      return keepCheckingCodeBlock(currentLength, retries - 1, maxStableChecks)
    }

    return keepCheckingCodeBlock(0, 15, 3)
  })
}

export default getJSONResponse

