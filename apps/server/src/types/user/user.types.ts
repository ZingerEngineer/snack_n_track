interface IUser {
  id: string
  name?: string
  email: string
  avatar?: string
  googleId?: string
  password: string
  role: string
  age?: number
  gender?: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  softDelete: boolean
}

interface IPreferences {
  id: string
  userId: string
  language: string
  theme: string
  notifications: boolean
}
export { IUser, IPreferences }

