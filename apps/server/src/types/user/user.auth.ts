export type TTokenPayload = {
  userId: string
  role: string
}

export type TRefreshToken = {
  id: string
  token: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export type TLoginCredentials = {
  email: string
  password: string
}
export type TRegisterCredentials = {
  email: string
  password: string
}
