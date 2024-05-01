import { supabase } from '@/src/utils/config'

interface TopicParams {
  language_id?: string
}

export const getAllTopics = async ({
  language_id
}: TopicParams): Promise<Topic[]> => {
  const query = supabase.from('topic').select('*')
  const { data, error } = await query.eq('language_id', language_id)
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return data
}
