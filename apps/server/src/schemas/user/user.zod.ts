import z from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  email: z.string().email(),
  avatar: z.string().optional(),
  password: z.string(),
  role: z.string(),
  age: z.number().optional(),
  gender: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
  softDelete: z.boolean()
})

