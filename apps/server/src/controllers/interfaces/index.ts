type SupaBaseFileUploadResults = {
  id: string
  path: string
  fullPath: string
}

export interface IFileUploader {
  upload(): Promise<SupaBaseFileUploadResults>
}

