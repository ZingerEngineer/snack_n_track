interface ILoginUser {
  name?: string | null
  email: string | null
  avatar?: string | null
  age?: number | null
  gender?: string | null
}

interface ILoginResults {
  user: ILoginUser
  accessToken: string
  refreshToken: string
}
export type { ILoginResults }
