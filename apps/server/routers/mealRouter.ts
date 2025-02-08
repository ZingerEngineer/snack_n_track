import express, { Request, Response } from 'express'
import initSupaBaseClient from '../services/supabase'
import { InternalServerError } from '../classes/Error'
import multer from 'multer'
import fs from 'fs/promises' // For reading files asynchronously
import path from 'path'
import dotenv from 'dotenv'

import downloadFile from '../utils/downloadFile'
import { CaloriesCalculatorGPTRevamped } from '../services/caloriesCalculatorGpt.serviceRevamped'
import { CaloriesClaculator } from '../services/caloriesCalculator.service'

dotenv.config()

const calculationMethod = process.env.CURRENT_CALCULATOR_SECRET
const upload = multer({ dest: 'uploads/' })
const mealRouter = express.Router()

function generateFileName(originalName: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const extension = path.extname(originalName)
  const baseName = path.basename(originalName, extension)
  return `${baseName}-${timestamp}${extension}`
}

function appendExtensionBasedOnMimeType(
  fileName: string,
  mimeType: string
): string {
  const mimeTypes: { [key: string]: string } = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'application/pdf': '.pdf'
    // Add more mime types and their corresponding extensions as needed
  }

  const extension = mimeTypes[mimeType] || ''
  return fileName + extension
}

mealRouter.post(
  '/scan',
  upload.single('file'),
  async (req: Request, res: Response) => {
    try {
      const file = req.file

      if (!file) {
        throw new InternalServerError('No file uploaded')
      }

      // Read file buffer
      const fileBuffer = await fs.readFile(file.path)
      const supaBaseClient = initSupaBaseClient()

      console.log('File:', file)

      const fileName = generateFileName(file.filename)

      const fileNameWithExtension = appendExtensionBasedOnMimeType(
        fileName,
        file.mimetype
      )
      // Upload the file to Supabase Storage
      const { error } = await supaBaseClient.storage
        .from('snack-n-track-bucket')
        .upload(`meal/${fileNameWithExtension}`, fileBuffer, {
          contentType: file.mimetype
        })

      // Handle Supabase upload errors
      if (error) {
        throw new InternalServerError(
          `Supabase upload failed: ${error.message}`
        )
      }

      const { data: publicURL } = supaBaseClient.storage
        .from('snack-n-track-bucket')
        .getPublicUrl(`meal/${fileNameWithExtension}`)

      if (!publicURL) {
        throw new InternalServerError('Failed to get public URL')
      }

      // Delete the file from the local storage after successful upload
      await fs.unlink(file.path)
      console.log(`fileUrl: ${publicURL.publicUrl}`)

      await downloadFile(
        publicURL.publicUrl,
        `../downloads/${fileNameWithExtension}`
      )

      const caloriesCalculator = new CaloriesClaculator(
        CaloriesCalculatorGPTRevamped
      )
      const response = await caloriesCalculator.calculateCalories(
        `../downloads/${fileNameWithExtension}`
      )
      console.log('Response:', response)

      res.status(200).json({ response })
    } catch (error: any) {
      console.error('Upload error:', error)
      res
        .status(500)
        .json({ message: error.message || 'Internal Server Error' })
    }
  }
)

export default mealRouter

