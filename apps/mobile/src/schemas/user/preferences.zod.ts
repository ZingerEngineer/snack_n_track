import z from 'zod'
export const PreferencesSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  language: z.string(),
  theme: z.string(),
  notifications: z.boolean(),
})
