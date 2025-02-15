import express, { Request, Response } from 'express'
import { InternalServerError } from '../classes/Error'
import multer from 'multer'
import scanMeamController from '../controllers/meal.controller'

const upload = multer({ dest: 'uploads/' })
const mealRouter = express.Router()

mealRouter.post(
  '/scan',
  upload.single('file'),
  async (req: Request, res: Response) => {
    try {
      const response = await scanMeamController(req)
      if (response?.status === 'failed')
        throw new InternalServerError('Failed to analyse photo')
      res.status(200).json({ response })
    } catch (error) {
      console.error('Error uploading photo:', error)
      res.status(500).json({ message: 'Failed to analyse photo' })
    }
  }
)

// mealRouter.post('/create', async (req: Request, res: Response) => {
//   try {
//     const response = await createMealController(req)
//     res.status(200).json({ response })
//   } catch (error) {
//     console.error('Error uploading photo:', error)
//     res.status(500).json({ message: 'Failed to analyse photo' })
//   }
// })

export default mealRouter

