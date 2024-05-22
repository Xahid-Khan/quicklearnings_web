import { Topic } from '@/src/lib/data_types'
import getSupabaseInstance from '@/src/utils/config'

interface TopicParams {
  subject_id: string
}

export const getAllTopics = async ({
  subject_id
}: TopicParams): Promise<Topic[]> => {
  const supabase = getSupabaseInstance()
  const query = supabase.from('topic').select('*')
  const { data, error } =
    subject_id == 'all' ? await query : await query.eq('subject_id', subject_id)
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return data
}
