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
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.PROD_URL_FRONTEND
        : process.env.DEV_URL_FRONTEND,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, Refresh'
  })
)
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(router)
app.use(errorHandler)

let supaBaseClient: SupabaseClient | null = null

const port = 8080

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

