interface User {
  id: number
  email: string
  name?: string
  password: string
  gender?: string
  age?: number
  goals?: string
  dietary_preferences?: string
  medical_conditions?: string
  createdAt: Date
}

export { User }

