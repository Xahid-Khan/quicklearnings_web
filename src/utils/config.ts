import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = `${process.env['NEXT_SUPABASE_URL']}`,
  SUPABASE_TOKEN = `${process.env['NEXT_SUPABASE_ANON_KEY']}`

export const supabase = createClient(SUPABASE_URL, SUPABASE_TOKEN)
