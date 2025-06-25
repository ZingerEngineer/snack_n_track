import { ValidationError } from '../../classes/Error'

export const checkFileExists = (
  file: Express.Multer.File | undefined
): Express.Multer.File => {
  if (!file) {
    console.error('[checkFileExists] No file found in request')
    throw new ValidationError('No file found in request')
  }

  if (!file.originalname || !file.mimetype) {
    console.error('[checkFileExists] File is missing required properties')
    throw new ValidationError('File is missing required properties')
  }

  console.info('[checkFileExists] File validation successful')
  return file
}

