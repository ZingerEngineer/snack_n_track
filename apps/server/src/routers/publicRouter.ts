import express, { Request, Response } from 'express'
import authRouter from './authRouter'
const publicRouter = express.Router()

publicRouter.get('/', (_, res) => {
  res.json({ message: 'Hello World' })
})

publicRouter.use('/auth', authRouter)

export default publicRouter

