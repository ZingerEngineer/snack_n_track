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

class TokenUtils {
  private static refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
  private static accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

  static createRefreshToken(
    payload: ITokenPayload,
    daysExpiresIn?: number
  ): string {
    const refreshTokenSecret = this.refreshTokenSecret
    if (!refreshTokenSecret || !payload) {
      throw new InternalServerError('Failed to generate refresh token')
    }
    return jwt.sign(payload, refreshTokenSecret, {
      expiresIn: daysExpiresIn ? `${daysExpiresIn}d` : '7d'
    })
  }

  static createAccessToken(
    payload: ITokenPayload,
    expiresInMinutes?: number
  ): string {
    const accessTokenSecret = this.accessTokenSecret
    if (!accessTokenSecret || !payload) {
      throw new InternalServerError('Failed to generate access token')
    }
    return jwt.sign(payload, accessTokenSecret, {
      expiresIn: expiresInMinutes ? `${expiresInMinutes}m` : '15m'
    })
  }

  static verifyAccessToken(token: string): string | object {
    const accessTokenSecret = this.accessTokenSecret
    if (!accessTokenSecret) {
      throw new InternalServerError('Access token secret is not defined')
    }
    try {
      return jwt.verify(token, accessTokenSecret)
    } catch (error) {
      throw new ValidationError('Invalid access token')
    }
  }

  static verifyRefreshToken(token: string): string | object {
    const refreshTokenSecret = this.refreshTokenSecret
    if (!refreshTokenSecret) {
      throw new InternalServerError('Refresh token secret is not defined')
    }
    try {
      return jwt.verify(token, refreshTokenSecret)
    } catch (error) {
      throw new ValidationError('Invalid refresh token')
    }
  }
}

class RefreshTokenDAO {
  async createToken(payload: ITokenPayload) {
    try {
      const prisma = PrismaGlobal.getPrismaClient()
      const { userId, role, googleId } = payload
      const refreshToken = TokenUtils.createRefreshToken({
        userId: userId,
        role: role,
        googleId: googleId
      })
      const token = await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: userId
        }
      })
      return token
    } catch (error) {
      throw new InternalServerError('Failed to create refresh token')
    } finally {
      await PrismaGlobal.closePrismaClient()
    }
  }

  async getUserTokensByUserId(userId: string) {
    const prisma = PrismaGlobal.getPrismaClient()
    try {
      const tokens = await prisma.refreshToken.findMany({
        where: { userId: userId }
      })
      if (tokens.length === 0) {
        throw new NotFoundError('No tokens found for user')
      }
      return tokens
    } catch (error) {
      throw new InternalServerError('Failed to get user tokens')
    } finally {
      await PrismaGlobal.closePrismaClient()
    }
  }

  async getTokenByTokenId(tokenId: string) {
    const prisma = PrismaGlobal.getPrismaClient()
    try {
      const token = await prisma.refreshToken.findUnique({
        where: { id: tokenId }
      })
      return token
    } catch (error) {
      throw new InternalServerError('Failed to get token by id')
    } finally {
      await PrismaGlobal.closePrismaClient()
    }
  }

  async getTokenByUserId(userId: string) {
    const prisma = PrismaGlobal.getPrismaClient()
    try {
      const token = await prisma.refreshToken.findFirst({
        where: { userId: userId }
      })
      return token
    } catch (error) {
      throw new InternalServerError('Failed to get token by user id')
    } finally {
      await PrismaGlobal.closePrismaClient()
    }
  }

  async deleteTokenById(tokenId: string) {
    const prisma = PrismaGlobal.getPrismaClient()
    try {
      await prisma.refreshToken.delete({
        where: { id: tokenId }
      })
    } catch (error) {
      throw new InternalServerError('Failed to delete refresh token')
    } finally {
      await PrismaGlobal.closePrismaClient()
    }
  }
}

export { RefreshTokenDAO, TokenUtils }

