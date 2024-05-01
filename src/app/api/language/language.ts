import { supabase } from '@/src/utils/config'

export const getAllLanguages = async (): Promise<Language[]> => {
  const { data, error } = await supabase.from('language').select('*')
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return data
}
