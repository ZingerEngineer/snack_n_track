import express from 'express'
import cors from 'cors'
import multer from 'multer'
import dotenv from 'dotenv'
import { initFireBaseApp, initFireBaseStorage } from '../services/fireBase'
import OpenAI from 'openai'
import { FirebaseApp } from 'firebase/app'
import { ref, uploadBytes } from 'firebase/storage'
import initSupabase from '../services/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

function generateRandomImageName(orignalFileName: string) {
  const timestamp = Date.now()
  return `image_${timestamp}_${orignalFileName}`
}

dotenv.config({
  path: ['../../../.env', './.env']
})

const upload = multer({ dest: 'uploads/' })

const app = express()

app.use(express.json())
app.use(cors())

const port = 3000
let firebaseApp: FirebaseApp | null = null
let supaBaseClient: SupabaseClient | null = null
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

app.post(
  '/v1/api/upload',
  upload.single('file'),
  async function (req, res, next) {
    let imageURL: string | null = null
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      return next(error)
    }
    if (!firebaseApp) {
      throw new Error('Firebase app not initialized')
    }
    try {
      const filePath = path.resolve(file.path) // Path to the uploaded file
      const fileBuffer = fs.readFileSync(filePath)

      const results = await supaBaseClient?.storage
        .from('snackntrack')
        .upload(`public/${file.originalname}`, fileBuffer, {
          contentType: file.mimetype,
          cacheControl: '3600',
          upsert: true
        })
      if (results?.error) {
        console.log(results.error)
        console.log('1')
        throw new Error('Error uploading image')
      }
      if (!results?.data.fullPath || !results.data.fullPath) {
        console.log('2')
        throw new Error('Error uploading image')
      }
      const publicUrlRes = supaBaseClient?.storage
        .from('snackntrack')
        .getPublicUrl(results.data.fullPath)

      if (publicUrlRes?.data.publicUrl) imageURL = publicUrlRes?.data?.publicUrl

      if (!imageURL) {
        console.log('3')
        throw new Error('Error uploading image')
      }
      console.log(imageURL)
      const openai = new OpenAI({
        baseURL: 'https://api.openai.com/v1',
        apiKey: process.env.OPEN_AI_SECRET_KEY
      })

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'You are a food analyser software and you need to analyse an image that contains a type of food and return a response that shows the expected calories from the food as a number.'
          },
          { role: 'user', content: `Image url: ${imageURL}` }
        ]
      })
      if (!completion || !completion.choices[0].message.content) {
        throw new Error('Error getting response from OpenAI')
      }
      const response = completion.choices[0].message.content
      res.status(200).json({ message: response })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error uploading image' })
    }
  }
)

app.listen(port, async () => {
  console.log(`Server listening at http://localhost:${port}`)
  try {
    firebaseApp = initFireBaseApp()
  } catch (error) {
    console.error('Error initializing Firebase app')
  }

  try {
    supaBaseClient = initSupabase()
  } catch (error) {
    console.error('Error initializing Supabase client')
  }

  console.log('Firebase app initialized')
})

