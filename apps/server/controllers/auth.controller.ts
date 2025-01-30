import { Request } from 'express'
import { getUser } from '../daos/user.daos'

const login = (req: Request) => {
  const { email } = req.body
  const { password } = req.headers

  if (!email || !password) {
    throw new Error('Email and password are required')
  }
  return getUser
}

export { login }

