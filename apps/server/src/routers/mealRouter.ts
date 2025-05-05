import express, { Request, response, Response } from 'express'
import { InternalServerError } from '../classes/Error'
import multer from 'multer'
import scanMeamController from '../controllers/meal.controller'
import { extractJsonFromString } from '../utils/extractJsonFromString'

const upload = multer({ dest: 'uploads/' })
const mealRouter = express.Router()

mealRouter.post(
  '/scan',
  upload.single('file'),
  async (req: Request, res: Response) => {
    console.log(
      '[mealRouter POST /scan] Request received for scanning meal photo'
    )
    if (req.file) {
      console.log('[mealRouter POST /scan] File uploaded:', {
        originalname: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path
      })
    } else {
      console.warn('[mealRouter POST /scan] No file uploaded')
    }
    try {
      console.log('[mealRouter POST /scan] Invoking scanMeamController')
      const response = await scanMeamController(req)
      console.log('[mealRouter POST /scan] Controller response:', response)
      if (response?.status === 'failed') {
        console.error(
          '[mealRouter POST /scan] scanMeamController returned a failure status'
        )
        throw new InternalServerError('Failed to analyse photo')
      }
      console.log(
        '[mealRouter POST /scan] Successfully analysed photo. Sending response.'
      )
      if (!response || !response.data || !response.data.text) {
        throw new InternalServerError('Failed to analyse photo')
      }
      const jsonResponse = extractJsonFromString(response.data.text)
      if (!jsonResponse) {
        console.error(
          '[mealRouter POST /scan] Failed to extract JSON from response'
        )
        throw new InternalServerError('Failed to extract JSON from response')
      }
      console.log(
        '[mealRouter POST /scan] Successfully extracted JSON from response'
      )

      res.status(200).json({ response: jsonResponse })
      console.log(jsonResponse)
    } catch (error) {
      console.error('[mealRouter POST /scan] Error uploading photo:', error)
      res.status(500).json({ message: 'Failed to analyse photo' })
    }
  }
)

export default mealRouter
