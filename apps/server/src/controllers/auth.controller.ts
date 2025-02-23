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
    console.error('[validateCredentials] Missing email or password')
    throw new ValidationError('Email and password are required')
  }
}

const loginController = async (req: Request) => {
  const { email, password } = req.body
  console.log('[loginController] Login attempt for email:', email)
  validateCredentials(email, password)

  try {
    console.log('[loginController] Validating input with loginSchema')
    loginSchema.parse({ email, password })

    console.log('[loginController] Retrieving user by email:', email)
    const user = await userDao.getUserByEmail(email)

    if (!user) {
      console.error('[loginController] No user found for email:', email)
      throw new ValidationError('Invalid email or password')
    }

    const passwordMatches = await bcrypt.compare(password, user.password)
    console.log(
      '[loginController] Password comparison result:',
      passwordMatches
    )
    if (!passwordMatches) {
      console.error('[loginController] Invalid password for email:', email)
      throw new ValidationError('Invalid email or password')
    }

    const tokensPayload: ITokenPayload = {
      userId: user.id,
      role: user.role || 'USER',
      googleId: user.googleId ? user.googleId : null
    }
    console.log('[loginController] Generating access token')
    const accessToken = TokenUtils.createAccessToken(tokensPayload)
    console.log('[loginController] Generating refresh token')
    const refreshToken = (await refreshTokenDao.createToken(tokensPayload))
      .token

    console.log('[loginController] Login successful for email:', email)
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
    console.error('[loginController] Error during login process:', error)
    if (error instanceof z.ZodError || error instanceof ValidationError) {
      throw new ValidationError('Invalid email or password')
    }
    throw new InternalServerError('Failed to login')
  }
}

const registerController = async (req: Request) => {
  const { email, password } = req.body
  console.log('[registerController] Register attempt for email:', email)

  try {
    validateCredentials(email, password)
    console.log('[registerController] Validating input with registerSchema')
    registerSchema.parse({ email, password })

    console.log(
      '[registerController] Checking if user already exists for email:',
      email
    )
    const existingUser = await userDao.getUserByEmail(email)
    if (existingUser) {
      console.error('[registerController] Email already in use:', email)
      throw new ValidationError('Email already in use')
    }

    console.log('[registerController] Hashing password for email:', email)
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('[registerController] Creating new user for email:', email)
    await userDao.createUser({
      email,
      password: hashedPassword
    })

    console.log(
      '[registerController] Registration successful for email:',
      email
    )
    return {
      status: 'success'
    }
  } catch (error) {
    console.error('[registerController] Error during registration:', error)
    if (error instanceof z.ZodError) {
      throw new ValidationError('Invalid email or password')
    }
    throw new InternalServerError('Failed to register')
  }
}

const logoutController = async (req: Request) => {
  console.log('[logoutController] Logout attempt initiated')
  try {
    const accessTokenCookie = req.signedCookies['accessToken']
    console.log(
      '[logoutController] Access token cookie received:',
      accessTokenCookie
    )
    const accessToken = decodeURIComponent(accessTokenCookie)
    if (!accessToken || typeof accessToken !== 'string') {
      console.error('[logoutController] Invalid access token cookie')
      throw new ValidationError('Invalid auth cookie')
    }
    console.log('[logoutController] Verifying access token')
    const accessTokenData = TokenUtils.verifyAccessToken(accessToken)
    const parsedToken = accessTokenDataSchema.parse(accessTokenData)
    const userId = parsedToken.userId
    console.log(
      '[logoutController] Retrieved userId from access token:',
      userId
    )

    console.log(
      '[logoutController] Retrieving refresh tokens for user:',
      userId
    )
    const tokens = await refreshTokenDao.getUserTokensByUserId(userId)
    if (!tokens.length) {
      console.error('[logoutController] No tokens found for user:', userId)
      throw new ValidationError('No tokens found for user')
    }

    console.log('[logoutController] Deleting refresh tokens for user:', userId)
    await Promise.all(
      tokens.map((token) => {
        console.log('[logoutController] Deleting token with id:', token.id)
        return refreshTokenDao.deleteTokenById(token.id.toString())
      })
    )
    console.log('[logoutController] Logout successful for user:', userId)
    return { status: 'success' }
  } catch (error) {
    console.error('[logoutController] Error during logout process:', error)
    if (error instanceof z.ZodError) {
      throw new ValidationError('Invalid access token')
    }
    throw new InternalServerError('Failed to logout')
  }
}

const refreshTokenController = async (req: Request) => {
  console.log('[refreshTokenController] Refresh token request initiated')
  try {
    const refreshTokenCookie = req.signedCookies['refreshToken']
    console.log(
      '[refreshTokenController] Received refresh token cookie:',
      refreshTokenCookie
    )

    if (!refreshTokenCookie || typeof refreshTokenCookie !== 'string') {
      console.error('[refreshTokenController] Invalid refresh token cookie')
      throw new ValidationError('Invalid refresh token')
    }
    const decodedToken = decodeURIComponent(refreshTokenCookie)
    console.log('[refreshTokenController] Decoded refresh token:', decodedToken)
    const tokenData = TokenUtils.verifyRefreshToken(decodedToken)
    console.log('[refreshTokenController] Verified token data:', tokenData)
    const parsedToken = accessTokenDataSchema.parse(tokenData)
    console.log('[refreshTokenController] Parsed token data:', parsedToken)
    console.log(
      '[refreshTokenController] Generating new access token for user:',
      parsedToken.userId
    )
    const newAccessToken = TokenUtils.createAccessToken({
      userId: parsedToken.userId,
      role: parsedToken.role,
      googleId: parsedToken.googleId
    })
    console.log(
      '[refreshTokenController] New access token generated:',
      newAccessToken
    )
    return { accessToken: newAccessToken }
  } catch (error) {
    console.error('[refreshTokenController] Error during token refresh:', error)
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

