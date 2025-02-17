import path from 'path'

function appendExtensionBasedOnMimeType(
  fileName: string,
  mimeType: string
): string {
  const mimeTypes: { [key: string]: string } = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'application/pdf': '.pdf'
    // Add more mime types and their corresponding extensions as needed
  }

  const extension = mimeTypes[mimeType] || ''
  return fileName + extension
}

function generateFileName(originalName: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const extension = path.extname(originalName)
  const baseName = path.basename(originalName, extension)
  return `${baseName}-${timestamp}${extension}`
}

export { appendExtensionBasedOnMimeType, generateFileName }

