import express from 'express'
import authenticationMiddleware from '../middlewares/authenticationMiddleware'
import { Request, Response } from 'express'
import mealRouter from './mealRouter'
import userSettingsRouter from './userSettingsRouter'

const privateRouter = express.Router()

// Authentication middleware
privateRouter.use(authenticationMiddleware)

// Route handler
privateRouter.get('/', (_, res: Response) => {
  res.json({ message: 'Hello private World' })
})

// Mount routers
privateRouter.use('/meals', mealRouter)
privateRouter.use('/settings', userSettingsRouter)

export default privateRouter

