import { Request } from 'express'
import UserDao from '../daos/user.dao'
import { InternalServerError, ValidationError } from '../classes/Error'
import { z } from 'zod'
import { loginSchema, registerSchema } from '../schemas/user/user.auth.zod'
import bcrypt from 'bcrypt'
import { RefreshTokenDAO, TokenUtils } from '../daos/token.dao'
import { accessTokenDataSchema } from '../schemas/token.zod'
import { ITokenPayload } from '../types/user/user.auth'
const userDao = new UserDao()
const refreshTokenDao = new RefreshTokenDAO()

const validateCredentials = (email: string, password: string) => {
  if (!email || !password) {
    throw new ValidationError('Email and password are required')
  }
}

const loginController = async (req: Request) => {
  const { email, password } = req.body
  validateCredentials(email, password)

  try {
    loginSchema.parse({ email, password })
    const user = await userDao.getUserByEmail(email)

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ValidationError('Invalid email or password')
    }

    const tokensPayload: ITokenPayload = {
      userId: user.id,
      role: user.role || 'USER',
      googleId: user.googleId ? user.googleId : null
    }
    const accessToken = TokenUtils.createAccessToken(tokensPayload)
    const refreshToken = (await refreshTokenDao.createToken(tokensPayload))
      .token

    return {
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        age: user.age,
        gender: user.gender
      },
      accessToken,
      refreshToken
    }
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof ValidationError) {
      throw new ValidationError('Invalid email or password')
    }
    throw new InternalServerError('Failed to login')
  }
}

const registerController = async (req: Request) => {
  const { email, password } = req.body

  try {
    validateCredentials(email, password)

    registerSchema.parse({ email, password })
    const existingUser = await userDao.getUserByEmail(email)

    if (existingUser) {
      throw new ValidationError('Email already in use')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await userDao.createUser({
      email,
      password: hashedPassword
    })

    return {
      status: 'success'
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Invalid email or password')
    }
    console.error(error)
    throw new InternalServerError('Failed to register')
  }
}

const logoutController = async (req: Request) => {
  try {
    const accessToken = decodeURIComponent(req.signedCookies['accessToken'])
    if (!accessToken || typeof accessToken !== 'string') {
      throw new ValidationError('Invalid auth cookie')
    }
    const accessTokenData = TokenUtils.verifyAccessToken(accessToken)
    const parsedToken = accessTokenDataSchema.parse(accessTokenData)
    const userId = parsedToken.userId

    const tokens = await refreshTokenDao.getUserTokensByUserId(userId)
    if (!tokens.length) {
      throw new ValidationError('No tokens found for user')
    }

    await Promise.all(
      tokens.map((token) =>
        refreshTokenDao.deleteTokenById(token.id.toString())
      )
    )
    return { status: 'success' }
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      throw new ValidationError('Invalid access token')
    }
    throw new InternalServerError('Failed to logout')
  }
}

const refreshTokenController = async (req: Request) => {
  try {
    const refreshToken = req.signedCookies['refreshToken']

    if (!refreshToken || typeof refreshToken !== 'string') {
      throw new ValidationError('Invalid refresh token')
    }
    console.log('refreshToken:', refreshToken)
    const decodedToken = decodeURIComponent(refreshToken)
    console.log('decodedToken:', decodedToken)
    const tokenData = TokenUtils.verifyRefreshToken(decodedToken)
    console.log('tokenData:', tokenData)
    const parsedToken = accessTokenDataSchema.parse(tokenData)
    console.log('parsedToken:', parsedToken)
    const newAccessToken = TokenUtils.createAccessToken({
      userId: parsedToken.userId,
      role: parsedToken.role,
      googleId: parsedToken.googleId
    })
    console.log('newAccessToken:', newAccessToken)
    return { accessToken: newAccessToken }
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError || error instanceof ValidationError) {
      throw new ValidationError('Invalid refresh token')
    }
    throw new InternalServerError('Failed to refresh token')
  }
}

export {
  loginController,
  registerController,
  logoutController,
  refreshTokenController
}

