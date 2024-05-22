import { Subject } from '@/src/lib/data_types'
import getSupabaseInstance from '@/src/utils/config'
import { cookies } from 'next/headers'
import { USER_SESSION_COOKIE_NAME } from '../constants'

export const getAllSubjects = async (): Promise<Subject[]> => {
  const supabase = getSupabaseInstance()
  const session = cookies().get(USER_SESSION_COOKIE_NAME)?.value

  let query = supabase.from('subject').select('*').or('public.eq.true')

  if (session) {
    supabase.auth.setSession(JSON.parse(session))
    const userId = (await supabase.auth.getSession()).data.session?.user.id
    if (userId) query = query.or(`public.eq.true, user_id.eq.${userId}`)
  }
  const { data, error } = await query
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return data
}
