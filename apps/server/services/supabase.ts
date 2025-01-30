import { createClient } from '@supabase/supabase-js'
import { BaseError, InternalServerError } from '../classes/Error'

// Create a single supabase client for interacting with your database
const initSupabaseClient = () => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY)
    throw new BaseError('Missing Supabase environment variables', 500, false)

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  )
  return supabase
}

export default initSupabaseClient

