import getSupabaseInstance from '@/src/utils/config'
import { cookies } from 'next/headers'
import { USER_SESSION_COOKIE_NAME } from '@/src/app/api/constants'

export const getUserId = async (): Promise<string> => {
  const supabase = getSupabaseInstance()
  const session = cookies().get(USER_SESSION_COOKIE_NAME)?.value

  if (session) {
    supabase.auth.setSession(JSON.parse(session))
    const userId = (await supabase.auth.getUser()).data.user?.id
    if (userId) {
      return userId
    }
  }
  throw new Error('You must be logged in to perform this action', {
    cause: 401
  })
}

export const getUserIdOrNull = async (): Promise<string | null> => {
  const supabase = getSupabaseInstance()
  const session = cookies().get(USER_SESSION_COOKIE_NAME)?.value

  if (session) {
    supabase.auth.setSession(JSON.parse(session))
    const userId = (await supabase.auth.getUser()).data.user?.id
    if (userId) {
      return userId
    }
  }
  return null
}
