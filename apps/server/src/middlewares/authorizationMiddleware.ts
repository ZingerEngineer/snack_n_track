import { Request, Response, NextFunction } from 'express'
import { refreshTokenController } from '../controllers/auth.controller'
import { TokenUtils } from '../daos/token.dao'

const authorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const accessToken = decodeURIComponent(req.signedCookies['accessToken'])
  try {
    if (accessToken) {
      // Verify the access token
      TokenUtils.verifyAccessToken(accessToken)
      return next() // Token is valid, proceed to the next middleware
    }
  } catch (error) {
    try {
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
      console.error(error)
      res.status(401).json({ message: 'Unauthorized access' })
    }
  }
  // No token provided or invalid token, attempt to refresh
}

export default authorizationMiddleware

