import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/supabase'

const SUPABASE_URL = `${process.env['NEXT_SUPABASE_URL']}`,
  SUPABASE_TOKEN = `${process.env['NEXT_SUPABASE_ANON_KEY']}`

let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null

const getSupabaseInstance = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(SUPABASE_URL, SUPABASE_TOKEN)
  }
  return supabaseInstance
}

export default getSupabaseInstance
