import express, { Request, Response } from 'express'
import {
  loginController,
  registerController,
  logoutController,
  refreshTokenController
} from '../controllers/auth.controller'
import { BaseError } from '../classes/Error'
import authenticationMiddleware from '../middlewares/authenticationMiddleware'
const authRouter = express.Router()

authRouter.post('/login', async (req: Request, res: Response) => {
  console.log('[authRouter POST /login] Request received')
  try {
    const loginResults = await loginController(req)
    console.log(
      '[authRouter POST /login] Login controller executed successfully'
    )
    res.cookie('accessToken', loginResults.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    })
    res.cookie('refreshToken', loginResults.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    console.log('[authRouter POST /login] Cookies set, sending response')
    res.status(200).json(loginResults)
  } catch (error) {
    console.error('[authRouter POST /login] Error occurred:', error)
    if (error instanceof BaseError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }
    res.status(400).json({ error })
  }
})

authRouter.post('/register', async (req: Request, res: Response) => {
  console.log('[authRouter POST /register] Request received')
  try {
    const registerResults = await registerController(req)
    console.log(
      '[authRouter POST /register] Register controller executed successfully'
    )
    res.status(200).json(registerResults)
  } catch (error) {
    console.error('[authRouter POST /register] Error occurred:', error)
    if (error instanceof BaseError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }
    res.status(400).json({ error })
  }
})

authRouter.post('/logout', async (req: Request, res: Response) => {
  console.log('[authRouter POST /logout] Request received')
  try {
    const logoutResults = await logoutController(req)
    console.log(
      '[authRouter POST /logout] Logout controller executed successfully'
    )
    if (logoutResults.status === 'success') {
      console.log(
        '[authRouter POST /logout] Clearing cookies due to successful logout'
      )
      res.clearCookie('accessToken')
      res.clearCookie('refreshToken')
    }
    res.status(200).json(logoutResults)
  } catch (error) {
    console.error('[authRouter POST /logout] Error occurred:', error)
    if (error instanceof BaseError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }
    res.status(400).json({ error })
  }
})

authRouter.post('/refresh-token', async (req: Request, res: Response) => {
  console.log('[authRouter POST /refresh-token] Request received')
  try {
    const results = await refreshTokenController(req)
    console.log(
      '[authRouter POST /refresh-token] Refresh token controller executed successfully'
    )
    res.cookie('accessToken', results.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    console.log(
      '[authRouter POST /refresh-token] Access token cookie set, sending response'
    )
    res.status(200).json(results)
  } catch (error) {
    console.error('[authRouter POST /refresh-token] Error occurred:', error)
    if (error instanceof BaseError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }
    res.status(400).json({ error })
  }
})

authRouter.get(
  '/session',
  authenticationMiddleware,
  async (_, res: Response) => {
    console.log(
      '[authRouter GET /session] Session endpoint reached after authentication.'
    )
    res.json({ authorized: true })
  }
)

export default authRouter

