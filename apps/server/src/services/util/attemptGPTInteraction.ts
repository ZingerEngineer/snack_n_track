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
  await typeGPTPrompt(page, prompt)

  console.log('isFirstAttempt', isFirstAttempt)
  console.log('imageURL', imageURL)
  if (isFirstAttempt && imageURL) {
    await uploadImageToGPT(page, imageURL)
    await debouncedCheckingUpload(page)
  }

  await clickSendButton(page)
  await page.waitForSelector('div[data-message-author-role="assistant"]', {
    visible: true
  })

  const jsonObject = await getJSONResponse(page)
  if (!jsonObject) return null

  const parsedNutritionData = NutritionDataSchema.safeParse(jsonObject)
  if (parsedNutritionData.success) {
    return parsedNutritionData.data
  }

  const parsedEstimatedNutritionData =
    EstimatedNutritionDataSchema.safeParse(jsonObject)
  if (parsedEstimatedNutritionData.success) {
    return parsedEstimatedNutritionData.data
  }

  return null
}

export default attemptGPTInteraction

