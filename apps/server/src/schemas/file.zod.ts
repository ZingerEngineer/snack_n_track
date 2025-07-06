import { z } from 'zod'

export const FileUploadSchema = z.object({
  originalname: z.string().min(1, 'File name is required'),
  mimetype: z.enum(['image/png', 'image/jpeg', 'image/webp'], {
    required_error: 'MIME type is required',
    invalid_type_error: 'Invalid MIME type'
  }),
  size: z.number().int().min(1, 'File size must be greater than 0'),
  filename: z.string().min(1, 'Filename is required'),
  path: z.string().min(1, 'File path is required')
})

