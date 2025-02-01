import { Request, Response, NextFunction } from 'express'
import { refreshTokenController } from '../controllers/auth.controller'
import { TokenUtils } from '../daos/token.dao'

const authorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1] // Extract Bearer token

  try {
    if (token) {
      // Verify the access token
      TokenUtils.verifyAccessToken(token)
      return next() // Token is valid, proceed to the next middleware
    }

    // No token provided, attempt to refresh
    const results = await refreshTokenController(req)
    if (results?.accessToken) {
      res.cookie('accessToken', encodeURIComponent(results.accessToken), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        signed: true,
        maxAge: 15 * 60 * 1000
      })
      return next() // New access token issued, proceed
    } else {
      res.status(401).json({ message: 'Unauthorized access' })
    }
  } catch (error) {
    console.error('Authorization error:', error)
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export default authorizationMiddleware

