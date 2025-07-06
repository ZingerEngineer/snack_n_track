import { InternalServerError } from '../classes/Error'
import { SupabaseClient } from '@supabase/supabase-js'
import { IFileUploader } from '../types/services/supabase.types'
import { initSupaBaseClient } from '../services/supabase'
import fs from 'fs/promises'
import {
  generateFileName,
  appendExtensionBasedOnMimeType
} from '../utils/file/file.utils'

export class SupabaseFileUploader implements IFileUploader {
  private supabaseClient: SupabaseClient<any, 'public', any>

  constructor(
    private readonly file: Express.Multer.File,
    supabaseClient?: SupabaseClient<any, 'public', any>
  ) {
    if (supabaseClient) {
      this.supabaseClient = supabaseClient
    } else {
      console.info(
        '[SupabaseFileUploader] No Supabase client provided, creating a new one'
      )
      this.supabaseClient = initSupaBaseClient()
    }
  }

  async upload() {
    try {
      console.info('[SupabaseFileUploader] Uploading file to Supabase storage')
      console.log(this.supabaseClient)

      console.log(
        '[SupabaseFileUploader] File details:',
        this.file.originalname,
        this.file.filename,
        this.file.path,
        this.file.mimetype
      )
      // Generate a unique file name
      const uniqueFileName = generateFileName(this.file.filename)
      // Append the correct file extension based on the MIME type
      const fileNameWithExtension = appendExtensionBasedOnMimeType(
        uniqueFileName,
        this.file.mimetype
      )
      console.log(
        '[SupabaseFileUploader] File name with extension:',
        fileNameWithExtension
      )

      const fileBuffer = await fs.readFile(this.file.path)
      console.log(
        '[SupabaseFileUploader] File buffer read successfully:',
        fileBuffer
      )

      const { data, error } = await this.supabaseClient.storage
        .from('snack-n-track-bucket')
        .upload(`meal/${fileNameWithExtension}`, fileBuffer, {
          contentType: this.file.mimetype
        })
      if (error) {
        console.log(error)
        console.error('[SupabaseFileUploader] Error uploading file:', error)
        throw new InternalServerError('Failed to upload file to Supabase')
      }

      console.info('[SupabaseFileUploader] File uploaded successfully:', data)
      return data
    } catch (error) {
      console.log(error)

      console.error('[SupabaseFileUploader] Error during upload:', error)
      throw new InternalServerError('Failed to upload file to Supabase')
    }
  }
}

