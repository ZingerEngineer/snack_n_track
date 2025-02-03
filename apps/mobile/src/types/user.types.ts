interface IUser {
  id: number
  email: string
}

interface ILoginCredentials {
  email: string
  password: string
}

export type { IUser, ILoginCredentials }
