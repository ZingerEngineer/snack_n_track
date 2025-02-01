import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(100)
})

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(100)
})

export { loginSchema, registerSchema }

