import imageCompression from 'browser-image-compression'
import type { 
  IImageCompressionOptions, 
  IImageCompressionResult 
} from './types'
import { DEFAULT_COMPRESSION_OPTIONS } from './compressionConfig'

/**
 * Compress an image file while preserving quality for computer vision
 * @param file - The original image file
 * @param options - Compression options (defaults to DEFAULT_COMPRESSION_OPTIONS)
 * @param progressCallback - Optional callback for compression progress
 * @returns Promise<IImageCompressionResult> - Compression result with metadata
 */
export async function compressImage(
  file: File,
  options: Partial<IImageCompressionOptions> = {},
  progressCallback?: (progress: number) => void,
): Promise<IImageCompressionResult> {
  const compressionOptions = { ...DEFAULT_COMPRESSION_OPTIONS, ...options }

  try {
    const originalSize = file.size

    // Add progress tracking if callback provided
    const optionsWithProgress = progressCallback
      ? {
          ...compressionOptions,
          onProgress: (progress: number) => {
            progressCallback(Math.round(progress))
          },
        }
      : compressionOptions

    const compressedFile = await imageCompression(file, optionsWithProgress)
    const compressedSize = compressedFile.size
    const compressionRatio = originalSize > 0 ? (1 - compressedSize / originalSize) * 100 : 0

    console.log('Image compression completed:', {
      originalSize: `${(originalSize / 1024 / 1024).toFixed(2)} MB`,
      compressedSize: `${(compressedSize / 1024 / 1024).toFixed(2)} MB`,
      compressionRatio: `${compressionRatio.toFixed(1)}%`,
      finalQuality: compressionOptions.quality,
    })

    return {
      originalFile: file,
      compressedFile,
      originalSize,
      compressedSize,
      compressionRatio,
    }
  } catch (error) {
    console.error('Image compression failed:', error)
    throw new Error(
      `Image compression failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}
