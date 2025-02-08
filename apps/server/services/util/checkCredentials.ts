import { NotFoundError, ValidationError } from '../../classes/Error'

export function checkCredentials(
  email: string | undefined,
  password: string | undefined
): boolean {
  try {
    if (!email || !password) {
      throw new NotFoundError(
        'Environment variables EMAIL and PASSWORD must be set'
      )
    }

    return !!email && !!password
  } catch (error) {
    throw new ValidationError("Email and password can't be empty")
  }
}

