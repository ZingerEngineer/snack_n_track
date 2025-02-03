import express, { Request, Response } from 'express'
import initSupaBaseClient from '../services/supabase'
import { InternalServerError } from '../classes/Error'
import multer from 'multer'
import fs from 'fs/promises' // For reading files asynchronously
import path from 'path'

const upload = multer({ dest: 'uploads/' })
const mealRouter = express.Router()

function generateFileName(originalName: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const extension = path.extname(originalName)
  const baseName = path.basename(originalName, extension)
  return `${baseName}-${timestamp}${extension}`
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

      // Upload the file to Supabase Storage
      const { data, error } = await supaBaseClient.storage
        .from('snackntrack')
        .upload(`public/${generateFileName(file.filename)}`, fileBuffer, {
          contentType: file.mimetype
        })

      // Handle Supabase upload errors
      if (error) {
        throw new InternalServerError(
          `Supabase upload failed: ${error.message}`
        )
      }

      // Delete the file from the local storage after successful upload
      await fs.unlink(file.path)

      res.status(200).json({ data })
    } catch (error: any) {
      console.error('Upload error:', error)
      res
        .status(500)
        .json({ message: error.message || 'Internal Server Error' })
    }
  }
)

export default mealRouter

