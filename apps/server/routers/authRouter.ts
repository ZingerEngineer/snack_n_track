import express, { Request, Response } from 'express'
import { login } from '../controllers/auth.controller'
const authRouter = express.Router()

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const user = await login(req)
    res.status(200).json({ userData: user })
  } catch (error) {
    res.status(400).json({ error })
  }
})

authRouter.post('/register', (req: Request, res: Response) => {})

authRouter.post('/logout', (req: Request, res: Response) => {})
export default authRouter
