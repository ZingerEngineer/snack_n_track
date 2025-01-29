import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const initSupabaseClient = () => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY)
    throw new Error('Missing Supabase environment variables')

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  )
  return supabase
}

export default initSupabaseClient
