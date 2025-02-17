import express, { Request, Response } from 'express'
import {
  loginController,
  registerController,
  logoutController,
  refreshTokenController
} from '../controllers/auth.controller'
import { BaseError } from '../classes/Error'
import authorizationMiddleware from '../middlewares/authorizationMiddleware'
const authRouter = express.Router()

authRouter.get('/getme', (req: Request, res: Response) => {
  res.json({ message: 'hello' })
})

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const loginResults = await loginController(req)
    res.cookie('accessToken', encodeURIComponent(loginResults.accessToken), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    })
    res.cookie('refreshToken', encodeURIComponent(loginResults.refreshToken), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json(loginResults)
  } catch (error) {
    console.error(error)
    if (error instanceof BaseError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }
    res.status(400).json({ error })
  }
})

authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const registerResults = await registerController(req)
    res.status(200).json(registerResults)
  } catch (error) {
    console.error(error)
    if (error instanceof BaseError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }
    res.status(400).json({ error })
  }
})

authRouter.post('/logout', async (req: Request, res: Response) => {
  try {
    const logoutResults = await logoutController(req)
    if (logoutResults.status === 'success') {
      res.clearCookie('accessToken')
      res.clearCookie('refreshToken')
    }
    res.status(200).json(logoutResults)
  } catch (error) {
    console.error(error)
    if (error instanceof BaseError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }
    res.status(400).json({ error })
  }
})

authRouter.post('/refresh-token', async (req: Request, res: Response) => {
  try {
    const results = await refreshTokenController(req)
    res.cookie('accessToken', encodeURIComponent(results.accessToken), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json(results)
  } catch (error) {
    console.error(error)
    if (error instanceof BaseError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }
    res.status(400).json({ error })
  }
})

authRouter.get(
  '/session',
  authorizationMiddleware,
  async (_, res: Response) => {
    res.json({ authenticated: true })
  }
)

export default authRouter

