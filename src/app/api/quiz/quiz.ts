import { QuizViewData } from '@/src/lib/data_types'
import { supabase } from '@/src/utils/config'

interface QuizOptionProps {
  languageId?: string | number | null
  topicId?: string | number | null
}

interface QuizProps {
  languageId: string | number
  topicId: string | number
  limit: string | number
}

export const getQuizData = async ({
  languageId,
  topicId,
  limit
}: QuizProps): Promise<QuizViewData[]> => {
  const randomize = [0, '0']
  let query = supabase.from('random_data').select('*').limit(Number(limit))
  if (!randomize.includes(topicId)) query = query.eq('topic_id', topicId)
  if (!randomize.includes(languageId))
    query = query.eq('language_id', languageId)

  const { data, error } = await query

  if (error) throw new Error(error.message, { cause: 502 })
  return data
}

export const getAllLanguages = async () => {
  const { data, error } = await supabase
    .from('language')
    .select('id, label:title')
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return data
}

export const getAllTopics = async (options: QuizOptionProps) => {
  let query = supabase.from('topic').select('id, label:title')
  if (options.languageId) query = query.eq('language_id', options.languageId)

  const { data, error } = await query
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return data
}

export const getQuizOptions = async (options: QuizOptionProps) => {
  const languages = await getAllLanguages()
  const topics = options.languageId
    ? await getAllTopics({ languageId: options.languageId })
    : []
  return { languages, topics }
}
