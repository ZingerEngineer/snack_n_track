import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch' // Make sure to install node-fetch for Node.js

/**
 * Downloads a file from a URL and saves it to the specified local path.
 *
 * @param fileUrl - The URL of the file to download.
 * @param outputPath - The local path where the file should be saved.
 * @returns A promise that resolves when the file is downloaded.
 */
async function downloadFile(
  fileUrl: string,
  outPutDir: string,
  fileNameWithExtension: string
): Promise<string | undefined> {
  try {
    console.log(`Downloading file from ${fileUrl}`)
    const response = await fetch(fileUrl)
    console.log(`Response status: ${response.status}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch the file. Status: ${response.status}`)
    }

    // Ensure the directory exists
    const dir = path.join(__dirname, outPutDir)
    console.log(`Creating directory: ${dir}`)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const outPutFilePath = path.join(dir, fileNameWithExtension)
    console.log(`Output file path: ${outPutFilePath}`)
    // Create a writable stream and pipe the response body into it
    const fileStream = fs.createWriteStream(outPutFilePath, {
      flags: 'w',
      mode: 0o777
    })
    await new Promise<void>((resolve, reject) => {
      response.body.pipe(fileStream)
      response.body.on('error', (err) => reject(err))
      fileStream.on('finish', () => resolve())
    })

    console.log(`File downloaded successfully to ${outPutFilePath}`)
    return outPutFilePath
  } catch (error) {
    console.error(`Error downloading the file:`, error)
  }
}

export default downloadFile

