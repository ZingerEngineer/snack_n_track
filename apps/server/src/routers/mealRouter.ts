import express, { Request, response, Response } from 'express'
import multer from 'multer'
import {
  scanMealControllerGPT,
  scanMealControllerGemini
} from '../controllers/meal.controller'

const upload = multer({ dest: 'uploads/' })
const mealRouter = express.Router()
const currentCalculator = process.env.CURRENT_CALCULATOR_SECRET

mealRouter.post(
  '/scan',
  upload.single('file'),
  async (req: Request, res: Response) => {
    console.log(
      '[mealRouter POST /scan] Request received for scanning meal photo'
    )
    try {
      if (currentCalculator === 'gpt') {
        console.log('[mealRouter POST /scan] Using current calculator')
        const response = await scanMealControllerGPT(req)
        res.status(200).json(response)
      } else {
        console.log(
          '[mealRouter POST /scan] No current calculator, proceeding without it'
        )
        const response = await scanMealControllerGemini(req)
        res.status(200).json(response)
      }
    } catch (error) {
      console.error('[mealRouter POST /scan] Error uploading photo:', error)
      res.status(500).json({ message: 'Failed to analyse photo' })
    }
  }
)

export default mealRouter

