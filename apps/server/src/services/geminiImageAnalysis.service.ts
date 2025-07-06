import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
  UploadFileConfig,
  GenerateContentResponse
} from '@google/genai'

import { ZodImageFileChecker } from '../utils/file/checkMimeType'
import { lookup } from 'mime-types'

const checkFile = (filePath: string) => {
  console.log('Checking file:', filePath)
  const zodImageChecker = new ZodImageFileChecker()
  const file = {
    filePath,
    mimeType: lookup(filePath) || 'image/jpeg' // Default to jpeg if lookup fails
  }
  console.log('File details:', file)
  const fileCheckResults = zodImageChecker.isAllowed(file)
  if (!fileCheckResults) {
    console.error('File check failed for:', filePath)
    throw new Error('Invalid file type or size')
  }
  console.log('File check passed for:', filePath)
  return file
}

const ai = new GoogleGenAI({
  apiKey: 'AIzaSyCT8yjGgzvc2prfiY-okGB768uKFMXBELs'
})
console.log('Initialized GoogleGenAI instance')

export async function geminiApi(filePath: string, prompt: string) {
  console.log(
    'Starting Gemini API call with filePath:',
    filePath,
    'and prompt:',
    prompt
  )
  let response: GenerateContentResponse | null = null
  try {
    const checkedFile = checkFile(filePath)
    console.log('Uploading file to Google GenAI:', checkedFile.filePath)
    const myfile = await ai.files.upload({
      file: checkedFile.filePath,
      config: checkedFile.mimeType as UploadFileConfig
    })
    console.log('File uploaded successfully:', myfile)

    if (myfile.uri && myfile.mimeType) {
      console.log('Generating content with model "gemini-2.0-flash"')
      response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: createUserContent([
          createPartFromUri(myfile.uri, myfile.mimeType),
          prompt
        ])
      })
      console.log('Content generation successful:', response)
    } else {
      console.error('File upload failed or invalid file type:', myfile)
      throw new Error('File upload failed or invalid file type')
    }
    return response
  } catch (error) {
    console.error('Error during Gemini API call:', error)
    throw new Error('Gemini API call failed')
  }
}

