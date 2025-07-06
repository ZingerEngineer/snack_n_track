import { Request, Response, NextFunction } from 'express'
import { refreshTokenController } from '../controllers/auth.controller'
import { TokenUtils } from '../daos/token.dao'
import { ValidationError } from '../classes/Error'
import { accessTokenDataSchema } from '../schemas/token.zod'
import { AuthenticatedRequest } from '../types/shared.types'

const authenticationMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log('[AuthMiddleware] Incoming request for URL:', req.originalUrl)

  const rawAccessToken =
    req.signedCookies['accessToken'] ||
    req.headers['authentication']?.toString().split(' ')[1]
  const rawRefreshToken =
    req.signedCookies['refreshToken'] ||
    req.headers['refresh']?.toString().split(' ')[1]

  if (!rawAccessToken) {
    console.warn('[AuthMiddleware] No access token found in signed cookies.')
    if (!rawRefreshToken) {
      console.warn('[AuthMiddleware] No refresh token found in signed cookies.')
      res.status(200).json({ authorized: false })
      return
    }
    console.log('[AuthMiddleware] Attempting to refresh token...')
    try {
      const results = await refreshTokenController(req)
      if (results.accessToken) {
        console.log(
          '[AuthMiddleware] Refresh token succeeded, new access token obtained.'
        )
        const tokenData = TokenUtils.verifyAccessToken(results.accessToken)
        if (!tokenData) {
          throw new ValidationError('Validation error: Invalid access token')
        }
        const parsedTokenData = accessTokenDataSchema.parse(tokenData)
        req.user = {
          userId: parsedTokenData.userId
        }
        res.cookie('accessToken', results.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          signed: true,
          maxAge: 15 * 60 * 1000
        })
        console.log(
          '[AuthMiddleware] New access token set in cookies. Proceeding...'
        )
        return next() // New access token issued, proceed
      } else {
        console.warn(
          '[AuthMiddleware] Refresh token controller did not return an access token.'
        )
        res.status(200).json({ authorized: false })
        return
      }
    } catch (refreshError) {
      console.error(
        '[AuthMiddleware] Error during token refresh:',
        refreshError
      )
      res.status(200).json({ authorized: false })
      return
    }
  }

  const accessToken = rawAccessToken
  console.log('[AuthMiddleware] Access token decoded.')

  try {
    console.log('[AuthMiddleware] Verifying access token...')
    const tokenData = TokenUtils.verifyAccessToken(accessToken)
    if (!tokenData) {
      throw new ValidationError('Validation error: Invalid access token')
    }
    const parsedTokenData = accessTokenDataSchema.parse(tokenData)
    req.user = {
      userId: parsedTokenData.userId
    }
    console.log('[AuthMiddleware] Access token is valid. Proceeding...')
    return next() // Token is valid, proceed to the next middleware
  } catch (verificationError) {
    console.warn(
      '[AuthMiddleware] Access token verification failed:',
      verificationError
    )
    res.status(200).json({ authorized: false })
    return
  }
}

export default authenticationMiddleware

