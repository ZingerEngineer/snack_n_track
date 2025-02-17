import z from 'zod'

const accessTokenDataSchema = z.object({
  userId: z.string(),
  iat: z.number(),
  exp: z.number()
})

const refreshTokenDataSchema = z.object({
  userId: z.string(),
  iat: z.number(),
  exp: z.number()
})

export { accessTokenDataSchema, refreshTokenDataSchema }

