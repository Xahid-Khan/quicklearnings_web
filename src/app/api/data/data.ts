import { QuizDataResponse } from '@/src/lib/data_types'
import { supabase } from '@/src/utils/config'

export const getDataByTopicId = async (
  topicId: string,
  limit: number,
  page: number
): Promise<QuizDataResponse> => {
  const from = page * limit
  const { data, error, count } = await supabase
    .from('data')
    .select('*', { count: 'exact' })
    .eq('topic_id', topicId)
    .limit(limit)
    .range(from, from + limit - 1)
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  if (!data || !count) {
    throw new Error('Failed to fetch the data and count', { cause: 502 })
  }
  return { data, count }
}
