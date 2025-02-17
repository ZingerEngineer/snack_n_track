import { NotFoundError, ValidationError } from '../../classes/Error'

export function checkCredentials(
  email: string | undefined,
  password: string | undefined
): boolean {
  if (!email || !password) {
    throw new NotFoundError(
      'Environment variables EMAIL and PASSWORD must be set'
    )
  }
  return true
}
