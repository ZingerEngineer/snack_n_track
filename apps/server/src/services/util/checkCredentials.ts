import { NotFoundError } from '../../classes/Error'

export function checkCredentials(
  email: string | undefined,
  password: string | undefined
): boolean {
  console.log('[checkCredentials] Starting credentials validation.')

  if (!email || !password) {
    console.error(
      '[checkCredentials] Missing credentials. Email:',
      email,
      'Password provided:',
      !!password
    )
    throw new NotFoundError(
      'Environment variables EMAIL and PASSWORD must be set'
    )
  }

  console.log('[checkCredentials] Credentials validated successfully.')
  return true
}

