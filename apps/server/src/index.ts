import express from 'express'
import cors from 'cors'
import multer from 'multer'
import dotenv from 'dotenv'
import initSupabase from './services/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import router from './routers/index'
import errorHandler from './middlewares/globalErrorHandler'
import { InternalServerError } from './classes/Error'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:5173', // ✅ Exact match, no wildcard
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true // ✅ If using cookies or authorization headers
  })
)
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(router)
app.use(errorHandler)

let supaBaseClient: SupabaseClient | null = null

const port = 3000

app.listen(port, async () => {
  console.log(`Server listening at http://localhost:${port}`)
  try {
    supaBaseClient = initSupabase()
    console.log('Supabase client initialized')
  } catch (error) {
    console.error(error)
    throw new InternalServerError('Failed to initialize Supabase client')
  }
})

