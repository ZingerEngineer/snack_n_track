interface IUser {
  name?: string | null
  email: string | null
  avatar?: string | null
  age?: number | null
  gender?: string | null
}

interface IPreferences {
  id: string
  userId: string
  language: string
  theme: string
  notifications: boolean
}

interface ILoginCredentials {
  email: string
  password: string
}
interface IRegisterCredentials {
  email: string
  password: string
}

export type { IUser, ILoginCredentials, IRegisterCredentials, IPreferences }
