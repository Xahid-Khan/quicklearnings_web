import getSupabaseInstance from '@/src/utils/config'
import { cookies } from 'next/headers'
import { USER_SESSION_COOKIE_NAME } from '../constants'

export const getUserByToken = async () => {
  const session = cookies().get(USER_SESSION_COOKIE_NAME)?.value ?? '{}'
  const supabase = getSupabaseInstance()
  supabase.auth.setSession(JSON.parse(session))
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    throw new Error(error.message, { cause: 401 })
  }
  return data
}

export const getSessionByToken = async (token: string, refToken: string) => {
  const supabase = getSupabaseInstance()
  const { data, error } = await supabase.auth.setSession({
    access_token: token,
    refresh_token: refToken
  })

  if (error) {
    throw new Error(error.message, { cause: 401 })
  }
  return data
}
