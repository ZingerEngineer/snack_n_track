import express from 'express'
import authorizationMiddleware from '../middlewares/authorizationMiddleware'
import { Request, Response } from 'express'
import mealRouter from './mealRouter'

const privateRouter = express.Router()

// Authorization middleware
privateRouter.use(authorizationMiddleware)

// Route handler
privateRouter.get('/', (_, res: Response) => {
  res.json({ message: 'Hello private World' })
})

privateRouter.use(mealRouter)

export default privateRouter

