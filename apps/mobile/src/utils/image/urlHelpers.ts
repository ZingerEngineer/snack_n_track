/**
 * Create a blob URL from compressed file for preview
 * @param compressedFile - The compressed image file
 * @returns string - Blob URL for the compressed image
 */
export function createCompressedImageUrl(compressedFile: File): string {
  return URL.createObjectURL(compressedFile)
}

/**
 * Create a blob URL from any file for preview
 * @param file - The image file
 * @returns string - Blob URL for the image
 */
export function createImageUrl(file: File): string {
  return URL.createObjectURL(file)
}

/**
 * Revoke a blob URL to free up memory
 * @param url - The blob URL to revoke
 */
export function revokeImageUrl(url: string): void {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url)
  }
}

/**
 * Convert a blob URL back to a File object
 * @param blobUrl - The blob URL
 * @param fileName - The desired file name
 * @returns Promise<File> - The file object
 */
export async function blobUrlToFile(blobUrl: string, fileName: string): Promise<File> {
  const response = await fetch(blobUrl)
  const blob = await response.blob()
  return new File([blob], fileName, { type: blob.type })
}
