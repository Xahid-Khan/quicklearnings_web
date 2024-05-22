import getSupabaseInstance from '@/src/utils/config'

export const getUserByToken = async (token: string) => {
  const supabase = getSupabaseInstance()
  const { data, error } = await supabase.auth.getUser(token)

  if (error) {
    throw new Error(error.message, { cause: 502 })
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
    throw new Error(error.message, { cause: 502 })
  }
  return data
}
