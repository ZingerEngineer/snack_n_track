import type { IImageCompressionOptions } from './types'

/**
 * Optimal compression settings for computer vision while maintaining quality
 * These settings preserve important visual features needed for food recognition
 *
 * JPEG is preferred over WebP for CV because:
 * - Universal compatibility with all CV models and APIs
 * - Food recognition models are typically trained on JPEG images
 * - Predictable compression artifacts that models can handle
 * - Better preservation of color information crucial for food identification
 */
export const DEFAULT_COMPRESSION_OPTIONS: IImageCompressionOptions = {
  maxSizeMB: 1.5, // Optimized for faster uploads while preserving quality
  maxWidthOrHeight: 1920, // High resolution maintained for detailed food analysis
  useWebWorker: true, // Non-blocking compression for better UX
  quality: 0.87, // Sweet spot for food CV - preserves textures and colors
  initialQuality: 0.92, // Start higher to maintain detail in first pass
  alwaysKeepResolution: false, // Allow smart resolution reduction if needed
  fileType: 'image/jpeg', // JPEG preferred for food recognition compatibility
}

/**
 * Alternative compression options for different food scanning scenarios
 */
export const COMPRESSION_PRESETS = {
  // For complex dishes with multiple ingredients or detailed textures
  HIGH_QUALITY: {
    ...DEFAULT_COMPRESSION_OPTIONS,
    maxSizeMB: 2.5,
    maxWidthOrHeight: 2048,
    quality: 0.92,
    initialQuality: 0.95,
  } as IImageCompressionOptions,

  // For simple food items or when optimizing for speed
  OPTIMIZED: {
    ...DEFAULT_COMPRESSION_OPTIONS,
    maxSizeMB: 1,
    maxWidthOrHeight: 1280,
    quality: 0.82,
    initialQuality: 0.87,
  } as IImageCompressionOptions,

  // For very fast uploads when network is limited
  FAST: {
    ...DEFAULT_COMPRESSION_OPTIONS,
    maxSizeMB: 0.7,
    maxWidthOrHeight: 1024,
    quality: 0.78,
    initialQuality: 0.82,
  } as IImageCompressionOptions,
}

/**
 * Get the appropriate compression preset based on file size and type
 * @param file - The image file to analyze
 * @returns IImageCompressionOptions - Recommended compression options
 */
export function getRecommendedCompressionOptions(file: File): IImageCompressionOptions {
  const fileSizeMB = file.size / 1024 / 1024

  // For very large files, use more aggressive compression
  if (fileSizeMB > 10) {
    return COMPRESSION_PRESETS.OPTIMIZED
  }

  // For medium files, use balanced compression
  if (fileSizeMB > 5) {
    return DEFAULT_COMPRESSION_OPTIONS
  }

  // For small files, preserve quality
  return COMPRESSION_PRESETS.HIGH_QUALITY
}
