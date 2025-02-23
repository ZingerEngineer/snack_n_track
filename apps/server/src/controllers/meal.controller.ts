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
    console.log('[scanMealController] Request received')
    const file = req.file
    if (!file) {
      console.error('[scanMealController] No file found in request')
      throw new ValidationError(
        'Scan meal controller failed due to missing file'
      )
    }
    console.log('[scanMealController] File received:', {
      originalname: file.originalname,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype
    })

    // Read file buffer
    console.log(
      '[scanMealController] Reading file from local storage:',
      file.path
    )
    const fileBuffer = await fs.readFile(file.path)
    console.log(
      '[scanMealController] File read successfully, buffer size:',
      fileBuffer.length
    )

    const supaBaseClient = initSupaBaseClient()
    console.log('[scanMealController] Supabase client initialized')

    const fileName = generateFileName(file.filename)
    console.log('[scanMealController] Generated file name:', fileName)

    const fileNameWithExtension = appendExtensionBasedOnMimeType(
      fileName,
      file.mimetype
    )
    console.log(
      '[scanMealController] File name with extension:',
      fileNameWithExtension
    )

    console.log('[scanMealController] Uploading file to Supabase storage')
    const { error } = await supaBaseClient.storage
      .from('snack-n-track-bucket')
      .upload(`meal/${fileNameWithExtension}`, fileBuffer, {
        contentType: file.mimetype
      })

    // Handle Supabase upload errors
    if (error) {
      console.error('[scanMealController] Supabase upload error:', error)
      throw new InternalServerError(`Supabase upload failed: ${error.message}`)
    }
    console.log('[scanMealController] File uploaded to Supabase successfully')

    const { data: publicURL } = supaBaseClient.storage
      .from('snack-n-track-bucket')
      .getPublicUrl(`meal/${fileNameWithExtension}`)

    if (!publicURL) {
      console.error('[scanMealController] Public URL retrieval failed')
      throw new InternalServerError('Failed to get public URL')
    }
    console.log(
      '[scanMealController] Retrieved public URL:',
      publicURL.publicUrl
    )

    // Delete the file from the local storage after successful upload
    console.log('[scanMealController] Deleting local file:', file.path)
    await fs.unlink(file.path)
    console.log('[scanMealController] Local file deleted successfully')

    console.log('[scanMealController] Downloading file from public URL')
    await downloadFile(
      publicURL.publicUrl,
      `../downloads/${fileNameWithExtension}`
    )
    console.log('[scanMealController] File downloaded to ../downloads')

    const GPTCalculator = new CaloriesCalculatorGPTRevamped()
    console.log(
      '[scanMealController] Initiating GPT calculator with file:',
      `../downloads/${fileNameWithExtension}`
    )
    const response = await GPTCalculator.recursiveCalculateCalories(
      `../downloads/${fileNameWithExtension}`,
      0,
      3
    )
    console.log('[scanMealController] GPT calculator response:', response)
    if (!response) {
      console.error('[scanMealController] No response from GPT calculator')
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

