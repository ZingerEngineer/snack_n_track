import z from 'zod'

const accessTokenDataSchema = z.object({
  userId: z.string().uuid(),
  role: z.string(),
  iat: z.number().int().positive(), // Issued At (timestamp)
  exp: z.number().int().positive() // Expiration Time (timestamp)
})

const refreshTokenDataSchema = z.object({
  userId: z.string().uuid(),
  role: z.string(),
  iat: z.number(),
  exp: z.number()
})

export { accessTokenDataSchema, refreshTokenDataSchema }

