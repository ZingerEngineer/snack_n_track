import express, { Request, Response } from 'express'
import authRouter from './authRouter'
const publicRouter = express.Router()

publicRouter.get('/', (_, res) => {
  res.json({ message: 'Server is online.' })
})

publicRouter.use('/auth', authRouter)

export default publicRouter

