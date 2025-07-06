import fs from 'fs/promises'
import { initSupaBaseClient } from '../../../services/supabase'
import { SupabaseFileUploader } from '../../../classes/SupaBaseFileUploader'
import downloadFile from '../../../utils/downloadFile'
import { sanitizeFileName } from '../../../utils/fileValidation'
import { NotFoundError, InternalServerError } from '../../../classes/Error'

/**
 * Service for handling file operations in meal scanning
 */
export class MealFileService {
  /**
   * Uploads file to Supabase storage and returns download information
   */
  static async uploadAndPrepareFile(
    validatedFile: Express.Multer.File
  ): Promise<{
    publicUrl: string
    fileName: string
    sanitizedFileName: string
  }> {
    // Sanitize filename for security
    const sanitizedFileName = sanitizeFileName(validatedFile.originalname)
    console.debug('[MealFileService] Sanitized filename:', sanitizedFileName)

    // Initialize Supabase client and upload file
    const supaBaseClient = initSupaBaseClient()
    const supaBaseFileUploader = new SupabaseFileUploader(
      {
        ...validatedFile,
        originalname: sanitizedFileName
      } as Express.Multer.File,
      supaBaseClient
    )

    const { id, path, fullPath } = await supaBaseFileUploader.upload()
    console.info('[MealFileService] File uploaded to Supabase:', {
      id,
      path,
      fullPath: fullPath.substring(0, 100) + '...' // Truncate for logging
    })

    const fileNameWithExtension = fullPath.split('/').pop()
    console.log('FILE EXTENSION' + fileNameWithExtension)
    if (!fileNameWithExtension) {
      throw new NotFoundError('File not found after upload')
    }

    // Get public URL
    const { data: publicURL } = supaBaseClient.storage
      .from('snack-n-track-bucket')
      .getPublicUrl(`meal/${fileNameWithExtension}`)

    if (!publicURL?.publicUrl) {
      throw new InternalServerError('Failed to retrieve public URL')
    }

    console.info('[MealFileService] Public URL retrieved')

    return {
      publicUrl: publicURL.publicUrl,
      fileName: fileNameWithExtension,
      sanitizedFileName
    }
  }

  /**
   * Downloads file from public URL for processing
   */
  static async downloadFileForProcessing(
    publicUrl: string,
    fileName: string
  ): Promise<string> {
    // Download file for processing
    const finalFilePath = await downloadFile(
      publicUrl,
      '../../../downloads',
      fileName
    )

    if (!finalFilePath) {
      throw new NotFoundError('File not found after download')
    }

    console.info('[MealFileService] File downloaded for processing')
    return finalFilePath
  }

  /**
   * Cleans up local file safely
   */
  static async cleanupLocalFile(
    filePath: string,
    context: string
  ): Promise<void> {
    try {
      await fs.unlink(filePath)
      console.info(`[MealFileService] ${context} file deleted successfully`)
    } catch (unlinkError) {
      console.warn(
        `[MealFileService] Failed to delete ${context} file:`,
        unlinkError
      )
    }
  }
}

