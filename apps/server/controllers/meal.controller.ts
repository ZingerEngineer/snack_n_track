import { Request, Response } from 'express'
import { ValidationError } from '../classes/Error'
import fs from 'fs/promises'
import initSupaBaseClient from '../services/supabase'
import { InternalServerError } from '../classes/Error'
import downloadFile from '../utils/downloadFile'
import { CaloriesCalculatorGPTRevamped } from '../services/caloriesCalculatorGpt.serviceRevamped'
import {
  appendExtensionBasedOnMimeType,
  generateFileName
} from '../utils/file/file.utils'

const scanMealController = async (req: Request) => {
  try {
    const file = req.file
    if (!file) {
      throw new ValidationError(
        'Scan meal controller failed due to missing file'
      )
    }
    // Read file buffer
    const fileBuffer = await fs.readFile(file.path)
    const supaBaseClient = initSupaBaseClient()
    const fileName = generateFileName(file.filename)
    const fileNameWithExtension = appendExtensionBasedOnMimeType(
      fileName,
      file.mimetype
    )

    const { error } = await supaBaseClient.storage
      .from('snack-n-track-bucket')
      .upload(`meal/${fileNameWithExtension}`, fileBuffer, {
        contentType: file.mimetype
      })

    // Handle Supabase upload errors
    if (error) {
      throw new InternalServerError(`Supabase upload failed: ${error.message}`)
    }

    const { data: publicURL } = supaBaseClient.storage
      .from('snack-n-track-bucket')
      .getPublicUrl(`meal/${fileNameWithExtension}`)

    if (!publicURL) {
      throw new InternalServerError('Failed to get public URL')
    }

    // Delete the file from the local storage after successful upload
    await fs.unlink(file.path)
    await downloadFile(
      publicURL.publicUrl,
      `../downloads/${fileNameWithExtension}`
    )

    const GPTCalculator = new CaloriesCalculatorGPTRevamped()
    const response = await GPTCalculator.recursiveCalculateCalories(
      `../downloads/${fileNameWithExtension}`,
      0,
      3
    )
    console.log('Response:', response)
    if (!response) {
      throw new InternalServerError(
        'Failed to get response from GPT calculator'
      )
    }
    return response
  } catch (error: any) {
    console.error('Scan meal controller failed:', error)
  }
}

export default scanMealController

