import express from 'express'
import cors from 'cors'
import multer from 'multer'
import dotenv from 'dotenv'
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
  }
)

app.listen(port, async () => {
  console.log(`Server listening at http://localhost:${port}`)
  try {
    supaBaseClient = initSupabase()
    console.log('Supabase client initialized')
  } catch (error) {
    console.error('Error initializing Supabase client')
  }
})

