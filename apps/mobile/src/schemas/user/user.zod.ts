import z from 'zod'

export const UserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  avatar: z.string().optional(),
  age: z.number().optional(),
  gender: z.string().optional(),
})
const emailSchema = z
  .string()
  .min(1, { message: 'Email is required.' })
  .email({ message: 'Must be a valid email' })

const passwordSchema = z.string().min(1, { message: 'Password is required.' })

export const RegisterSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})
