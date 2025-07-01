// Scan store types
// This file contains types specifically for the scan store and scan functionality

import type { INutritionData } from '../nutrition.types'

export interface IScanStoreState {
  imagePath: string | null
  nutritionData: INutritionData | null
  isUploading: boolean
  isImagePathSet: boolean
  isCompressing: boolean
  compressionProgress: number
}

export interface IScanResult {
  success: boolean
  data?: INutritionData
  error?: string
}

// Additional scan-related types that might be useful
export interface IScanProgress {
  step:
    | 'requesting_permission'
    | 'picking'
    | 'validating'
    | 'compressing'
    | 'uploading'
    | 'analyzing'
    | 'complete'
    | 'error'
  message?: string
  progress?: number
}

export interface IScanError {
  code:
    | 'INVALID_FILE'
    | 'COMPRESSION_FAILED'
    | 'UPLOAD_FAILED'
    | 'ANALYSIS_FAILED'
    | 'NETWORK_ERROR'
    | 'CAMERA_ERROR'
    | 'USER_CANCELLED'
    | 'PERMISSION_DENIED'
    | 'CAMERA_UNAVAILABLE'
    | 'FILE_TOO_LARGE'
    | 'INVALID_FILE_TYPE'
  message: string
  details?: Record<string, unknown>
}
