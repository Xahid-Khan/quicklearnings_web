import { QuizViewData } from '@/src/lib/data_types'
import getSupabaseInstance from '@/src/utils/config'

interface QuizOptionProps {
  subjectId?: string | number | null
  topicId?: string | number | null
}

interface QuizProps {
  subjectId: string | number
  topicId: string | number
  limit: string | number
}

export const getQuizData = async ({
  subjectId,
  topicId,
  limit
}: QuizProps): Promise<QuizViewData[]> => {
  const supabase = getSupabaseInstance()
  const randomize = [0, '0']
  let query = supabase
    .from('random_knowledge_base')
    .select('*')
    .limit(Number(limit))
  if (!randomize.includes(topicId)) query = query.eq('topic_id', topicId)
  if (!randomize.includes(subjectId)) query = query.eq('subject_id', subjectId)

  const { data, error } = await query

  if (error) throw new Error(error.message, { cause: 502 })
  return data
}

export const getAllSubjects = async () => {
  const supabase = getSupabaseInstance()
  const { data, error } = await supabase
    .from('subject')
    .select('id, label:title')
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return data
}

export const getAllTopics = async (options: QuizOptionProps) => {
  const supabase = getSupabaseInstance()
  let query = supabase.from('topic').select('id, label:title')
  if (options.subjectId) query = query.eq('subject_id', options.subjectId)

  const { data, error } = await query
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return data
}

export const getQuizOptions = async (options: QuizOptionProps) => {
  const subjects = await getAllSubjects()
  const topics = options.subjectId
    ? await getAllTopics({ subjectId: options.subjectId })
    : []
  return { subjects, topics }
}
