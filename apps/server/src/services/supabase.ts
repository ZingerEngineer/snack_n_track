import { createClient } from '@supabase/supabase-js'
import { InternalServerError } from '../classes/Error'

// Create a single supabase client for interacting with your database
export const initSupaBaseClient = () => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY)
    throw new InternalServerError('Missing Supabase environment variables')

  const supabaseClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  )
  return supabaseClient
}

