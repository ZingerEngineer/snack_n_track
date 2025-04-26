import {
  InternalServerError,
  NotFoundError,
  ValidationError
} from '../classes/Error'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
import PrismaGlobal from '../classes/PrismaGlobal'
import { ITokenPayload } from '../types/user/user.auth'
import { IRefreshToken } from '../types/token/refreshToken.type'

class TokenUtils {
  private static refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
  private static accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

  static createRefreshToken(payload: ITokenPayload): string {
    console.log('[TokenUtils.createRefreshToken] Called with payload:', {
      userId: payload.userId,
      role: payload.role,
      googleId: payload.googleId
    })
    const refreshTokenSecret = this.refreshTokenSecret
    if (!refreshTokenSecret || !payload) {
      console.error(
        '[TokenUtils.createRefreshToken] Missing refresh token secret or payload'
      )
      throw new InternalServerError('Failed to generate refresh token')
    }
    const token = jwt.sign(payload, refreshTokenSecret, { expiresIn: '7d' })
    console.log(
      '[TokenUtils.createRefreshToken] Refresh token created successfully'
    )
    return token
  }

  static createAccessToken(payload: ITokenPayload): string {
    console.log('[TokenUtils.createAccessToken] Called with payload:', {
      userId: payload.userId,
      role: payload.role,
      googleId: payload.googleId
    })
    const accessTokenSecret = this.accessTokenSecret
    if (!accessTokenSecret || !payload) {
      console.error(
        '[TokenUtils.createAccessToken] Missing access token secret or payload'
      )
      throw new InternalServerError('Failed to generate access token')
    }

    const token = jwt.sign(payload, accessTokenSecret, { expiresIn: '15m' })
    console.log(
      '[TokenUtils.createAccessToken] Access token created successfully'
    )
    return token
  }

  static verifyAccessToken(token: string): string | object {
    console.log('[TokenUtils.verifyAccessToken] Verifying access token')
    const accessTokenSecret = this.accessTokenSecret
    if (!accessTokenSecret) {
      console.error(
        '[TokenUtils.verifyAccessToken] Access token secret is not defined'
      )
      throw new InternalServerError('Access token secret is not defined')
    }
    try {
      const verified = jwt.verify(token, accessTokenSecret)
      console.log('[TokenUtils.verifyAccessToken] Token verified successfully')
      return verified
    } catch (error) {
      console.error(
        '[TokenUtils.verifyAccessToken] Token verification failed:',
        error
      )
      throw new ValidationError('Invalid access token')
    }
  }

  static verifyRefreshToken(token: string): string | object {
    console.log('[TokenUtils.verifyRefreshToken] Verifying refresh token')
    const refreshTokenSecret = this.refreshTokenSecret
    if (!refreshTokenSecret) {
      console.error(
        '[TokenUtils.verifyRefreshToken] Refresh token secret is not defined'
      )
      throw new InternalServerError('Refresh token secret is not defined')
    }
    try {
      const verified = jwt.verify(token, refreshTokenSecret)
      console.log('[TokenUtils.verifyRefreshToken] Token verified successfully')
      return verified
    } catch (error) {
      console.error(
        '[TokenUtils.verifyRefreshToken] Token verification failed:',
        error
      )
      throw new ValidationError('Invalid refresh token')
    }
  }
}

class RefreshTokenDAO {
  async createToken(payload: ITokenPayload): Promise<IRefreshToken> {
    console.log('[RefreshTokenDAO.createToken] Creating token for payload:', {
      userId: payload.userId
    })
    try {
      const prisma = PrismaGlobal.getPrismaClient()
      const { userId, role, googleId } = payload
      const refreshToken = TokenUtils.createRefreshToken({
        userId: userId,
        role: role,
        googleId: googleId
      })
      console.log('[RefreshTokenDAO.createToken] Refresh token generated')
      const token = await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: userId
        }
      })
      console.log(
        '[RefreshTokenDAO.createToken] Refresh token stored in database successfully'
      )
      return token as IRefreshToken
    } catch (error) {
      console.error(
        '[RefreshTokenDAO.createToken] Error occurred while creating token:',
        error
      )
      throw new InternalServerError('Failed to create refresh token')
    } finally {
      console.log('[RefreshTokenDAO.createToken] Closing Prisma client')
      await PrismaGlobal.closePrismaClient()
    }
  }

  async getUserTokensByUserId(userId: string): Promise<IRefreshToken[]> {
    console.log(
      '[RefreshTokenDAO.getUserTokensByUserId] Fetching tokens for userId:',
      userId
    )
    const prisma = PrismaGlobal.getPrismaClient()
    try {
      const tokens = await prisma.refreshToken.findMany({
        where: { userId: userId }
      })
      console.log(
        '[RefreshTokenDAO.getUserTokensByUserId] Tokens retrieved:',
        tokens.length
      )
      if (tokens.length === 0) {
        console.error(
          '[RefreshTokenDAO.getUserTokensByUserId] No tokens found for user:',
          userId
        )
        throw new NotFoundError('No tokens found for user')
      }
      return tokens as IRefreshToken[]
    } catch (error) {
      console.error(
        '[RefreshTokenDAO.getUserTokensByUserId] Error occurred while fetching tokens:',
        error
      )
      throw new InternalServerError('Failed to get user tokens')
    } finally {
      console.log(
        '[RefreshTokenDAO.getUserTokensByUserId] Closing Prisma client'
      )
      await PrismaGlobal.closePrismaClient()
    }
  }

  async getTokenByTokenId(tokenId: string): Promise<IRefreshToken | null> {
    console.log(
      '[RefreshTokenDAO.getTokenByTokenId] Fetching token with tokenId:',
      tokenId
    )
    const prisma = PrismaGlobal.getPrismaClient()
    try {
      const token = await prisma.refreshToken.findUnique({
        where: { id: tokenId }
      })
      console.log(
        '[RefreshTokenDAO.getTokenByTokenId] Token retrieved:',
        token ? 'Found' : 'Not Found'
      )
      return token as IRefreshToken | null
    } catch (error) {
      console.error(
        '[RefreshTokenDAO.getTokenByTokenId] Error occurred while fetching token:',
        error
      )
      throw new InternalServerError('Failed to get token by id')
    } finally {
      console.log('[RefreshTokenDAO.getTokenByTokenId] Closing Prisma client')
      await PrismaGlobal.closePrismaClient()
    }
  }

  async getTokenByUserId(userId: string): Promise<IRefreshToken | null> {
    console.log(
      '[RefreshTokenDAO.getTokenByUserId] Fetching token for userId:',
      userId
    )
    const prisma = PrismaGlobal.getPrismaClient()
    try {
      const token = await prisma.refreshToken.findFirst({
        where: { userId: userId }
      })
      console.log(
        '[RefreshTokenDAO.getTokenByUserId] Token retrieved:',
        token ? 'Found' : 'Not Found'
      )
      return token as IRefreshToken | null
    } catch (error) {
      console.error(
        '[RefreshTokenDAO.getTokenByUserId] Error occurred while fetching token:',
        error
      )
      throw new InternalServerError('Failed to get token by user id')
    } finally {
      console.log('[RefreshTokenDAO.getTokenByUserId] Closing Prisma client')
      await PrismaGlobal.closePrismaClient()
    }
  }

  async deleteTokenById(tokenId: string): Promise<void> {
    console.log(
      '[RefreshTokenDAO.deleteTokenById] Deleting token with tokenId:',
      tokenId
    )
    const prisma = PrismaGlobal.getPrismaClient()
    try {
      await prisma.refreshToken.delete({
        where: { id: tokenId }
      })
      console.log(
        '[RefreshTokenDAO.deleteTokenById] Token deleted successfully'
      )
    } catch (error) {
      console.error(
        '[RefreshTokenDAO.deleteTokenById] Error occurred while deleting token:',
        error
      )
      throw new InternalServerError('Failed to delete refresh token')
    } finally {
      console.log('[RefreshTokenDAO.deleteTokenById] Closing Prisma client')
      await PrismaGlobal.closePrismaClient()
    }
  }
}

export { RefreshTokenDAO, TokenUtils }
