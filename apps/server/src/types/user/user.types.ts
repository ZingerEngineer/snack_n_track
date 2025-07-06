export type TUser = {
  name?: string | null
  email: string | null
  avatar?: string | null
  age?: number | null
  gender?: string | null
}

export type TPreferences = {
  id: string
  userId: string
  language: string
  theme: string
  notifications: boolean
}

