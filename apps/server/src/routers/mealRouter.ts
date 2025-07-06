import express, { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import { scanMealHybridController } from '../controllers/mealController/meal.controller'
import authenticationMiddleware from '../middlewares/authenticationMiddleware'
import { ValidationError } from '../classes/Error'
import { AuthenticatedRequest } from '../types/shared.types'

// Configure multer for secure file upload
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
    files: 1 // Only allow 1 file per request
  },
  fileFilter: (req, file, cb) => {
    // Only allow image files
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new ValidationError('Only JPEG, PNG, and WebP images are allowed'))
    }
  }
})

const mealRouter = express.Router()
/**
 * Main meal scanning endpoint with hybrid approach (SnacknTrack + Gemini fallback)
 */
mealRouter.post(
  '/scan',
  authenticationMiddleware, // Require authentication
  upload.single('file'), // Handle file upload with security
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      console.info('[MealRouter] POST /scan - Processing hybrid scan request', {
        userId: req.user?.userId
      })

      const response = await scanMealHybridController(req)

      res.status(200).json({
        success: true,
        data: response,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      throw new Error(
        `[MealRouter] POST /scan - Error processing hybrid scan request.`
      )
    }
  }
)

export default mealRouter

