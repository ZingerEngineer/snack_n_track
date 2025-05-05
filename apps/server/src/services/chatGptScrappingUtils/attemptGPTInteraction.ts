import { Page } from 'puppeteer'
import {
  INutritionData,
  IEstimatedNutritionData
} from '../../types/global.types'
import typeGPTPrompt from './typeGPTPrompt'
import uploadImageToGPT from './uploadImageToGPT'
import debouncedCheckingUpload from './debouncedCheckingUpload'
import clickSendButton from './clickSendButton'
import getJSONResponse from './getJSONResponse'
import {
  NutritionDataSchema,
  EstimatedNutritionDataSchema
} from '../../schemas/calculator.zod'

async function attemptGPTInteraction(
  page: Page,
  {
    prompt,
    imageURL,
    isFirstAttempt
  }: {
    prompt: string
    imageURL: string | null
    isFirstAttempt: boolean
  }
): Promise<INutritionData | IEstimatedNutritionData | null> {
  console.log('--- Starting attemptGPTInteraction ---')
  console.log('Prompt:', prompt)

  try {
    // Step 1: Send the GPT prompt.
    console.log('Sending prompt to GPT...')
    await typeGPTPrompt(page, prompt)
    console.log('Prompt sent successfully.')

    // Step 2: Optionally upload image if it's the first attempt and an image URL is provided.
    console.log('isFirstAttempt:', isFirstAttempt)
    console.log('imageURL:', imageURL)
    if (isFirstAttempt && imageURL) {
      console.log('First attempt with image provided. Starting image upload...')
      await uploadImageToGPT(page, imageURL)
      console.log('Image upload initiated. Waiting for upload verification...')
      await debouncedCheckingUpload(page)
      console.log('Image upload verified successfully.')
    } else {
      console.log('No image upload required.')
    }

    // Step 3: Send the message.
    console.log('Clicking send button...')
    await clickSendButton(page)
    console.log('Send button clicked. Waiting for assistant response...')

    // Wait for the assistant response to appear.
    await page.waitForSelector('div[data-message-author-role="assistant"]', {
      visible: true
    })
    console.log('Assistant message detected.')

    // Step 4: Retrieve and parse the JSON response.
    console.log('Fetching JSON response from page...')
    const jsonObject = await getJSONResponse(page)
    if (!jsonObject) {
      console.error('No JSON response received from GPT.')
      return null
    }
    console.log('JSON response received:', jsonObject)

    // Attempt to parse using the first schema.
    console.log('Parsing JSON using NutritionDataSchema...')
    const parsedNutritionData = NutritionDataSchema.safeParse(jsonObject)
    if (parsedNutritionData.success) {
      console.log('JSON parsed successfully as INutritionData.')
      return parsedNutritionData.data
    } else {
      console.warn(
        'NutritionDataSchema parsing failed:',
        parsedNutritionData.error
      )
    }

    // Attempt to parse using the alternative schema.
    console.log('Parsing JSON using EstimatedNutritionDataSchema...')
    const parsedEstimatedNutritionData =
      EstimatedNutritionDataSchema.safeParse(jsonObject)
    if (parsedEstimatedNutritionData.success) {
      console.log('JSON parsed successfully as IEstimatedNutritionData.')
      return parsedEstimatedNutritionData.data
    } else {
      console.warn(
        'EstimatedNutritionDataSchema parsing failed:',
        parsedEstimatedNutritionData.error
      )
    }

    console.error('JSON response did not match any expected schemas.')
    return null
  } catch (error) {
    console.error('Error during GPT interaction:', error)
    throw error
  }
}

export default attemptGPTInteraction

