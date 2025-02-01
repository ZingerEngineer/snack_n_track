import {
  InternalServerError,
  NotFoundError,
  ValidationError
} from '../classes/Error'
import jwt from 'jsonwebtoken'
import PrismaGlobal from '../classes/PrismaGlobal'

class TokenUtils {
  private static refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
  private static accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

  static createRefreshToken(userId: string, daysExpiresIn?: number): string {
    const payload = { userId }
    const refreshTokenSecret = this.refreshTokenSecret
    if (!refreshTokenSecret || !payload) {
      throw new InternalServerError('Failed to generate refresh token')
    }
    return jwt.sign(payload, refreshTokenSecret, {
      expiresIn: daysExpiresIn ? `${daysExpiresIn}d` : '7d'
    })
  }

  static createAccessToken(userId: string, expiresInMinutes?: number): string {
    const payload = { userId }
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
  async createToken(userId: string) {
    const prisma = PrismaGlobal.getPrismaClient()
    try {
      const refreshToken = TokenUtils.createRefreshToken(userId)
      const token = await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: parseInt(userId)
        }
      })
      return token
    } catch (error) {
      throw new InternalServerError('Failed to create refresh token')
    } finally {
      await PrismaGlobal.closePrismaClient()
    }
  }

  async getUserTokens(userId: string) {
    const prisma = PrismaGlobal.getPrismaClient()
    try {
      const tokens = await prisma.refreshToken.findMany({
        where: { userId: parseInt(userId) }
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

  async getTokenById(tokenId: string) {
    const prisma = PrismaGlobal.getPrismaClient()
    try {
      const token = await prisma.refreshToken.findUnique({
        where: { id: parseInt(tokenId) }
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
        where: { userId: parseInt(userId) }
      })
      return token
    } catch (error) {
      throw new InternalServerError('Failed to get token by user id')
    } finally {
      await PrismaGlobal.closePrismaClient()
    }
  }

  async deleteTokenById(id: string) {
    const prisma = PrismaGlobal.getPrismaClient()
    try {
      await prisma.refreshToken.delete({
        where: { id: parseInt(id) }
      })
    } catch (error) {
      throw new InternalServerError('Failed to delete refresh token')
    } finally {
      await PrismaGlobal.closePrismaClient()
    }
  }
}

export { RefreshTokenDAO, TokenUtils }

