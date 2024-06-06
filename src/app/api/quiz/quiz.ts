import { QuizTopicOption, QuizViewData } from '@/src/lib/data_types'
import getSupabaseInstance from '@/src/utils/config'

interface QuizOptionProps {
  userId: string
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

export const getAllSubjects = async (userId: string) => {
  const supabase = getSupabaseInstance()
  const { data, error } = await supabase
    .from('subject')
    .select('id, label:title')
    .or(`is_public.eq.true,and(user_id.eq.${userId})`)
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return data
}

export const getAllTopics = async (options: QuizOptionProps) => {
  const supabase = getSupabaseInstance()
  let query = supabase.from('topic').select('id, label:title')
  if (options.subjectId) query = query.eq('subject_id', options.subjectId)

  const { data, error } = await query.or(
    `is_public.eq.true,and(user_id.eq.${options.userId})`
  )
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }

  const dataWithCount = await Promise.all(
    data.map(async (item) => {
      const count = await getQuizQuestionsCount({
        subjectId: options.subjectId ?? 0,
        topicId: item.id,
        limit: 0
      })
      return { ...item, questionsCount: count }
    })
  )

  return dataWithCount
}

export const getQuizQuestionsCount = async ({
  subjectId,
  topicId
}: QuizProps): Promise<number> => {
  const supabase = getSupabaseInstance()
  let query = supabase
    .from('random_knowledge_base')
    .select('*', { count: 'exact', head: true })
    .eq('subject_id', subjectId)
  if (Number(topicId) > 0) {
    query = query.eq('topic_id', topicId)
  }
  const { count, error } = await query

  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return count ?? 0
}

export const getQuizOptions = async (options: QuizOptionProps) => {
  const subjects = await getAllSubjects(options.userId)
  const topics = options.subjectId
    ? await getAllTopics({
        subjectId: options.subjectId,
        userId: options.userId
      })
    : []
  return { subjects, topics }
}
