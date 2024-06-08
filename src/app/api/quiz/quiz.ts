import { DBQuizView, KnowledgeViewData } from '@/lib/data_types'
import { NewQuizRequest, Quiz } from '@/lib/quizContracts'
import getSupabaseInstance from '@/utils/config'

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

interface QuizFilterProps {
  userId: string
  id?: number
  subjectId?: string | number
  topicId?: string | number
  limit?: string | number
}

export const getQuizData = async ({
  subjectId,
  topicId,
  limit
}: QuizProps): Promise<KnowledgeViewData[]> => {
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

  const { data, error } = await query
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

export const getPaginatedQuizData = async (
  userId: string,
  page: number,
  limit: number
): Promise<{ data: DBQuizView[]; count: number }> => {
  const from = page * limit
  const supabase = getSupabaseInstance()
  let query = supabase.from('quiz_view').select('*', { count: 'exact' })

  if (userId) {
    query = query.or(`is_public.eq.true,and(creator_id.eq.${userId})`)
  } else {
    query = query.eq('is_public', true)
  }

  const { data, error, count } = await query
    .limit(limit)
    .range(from, from + limit - 1)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message, { cause: 502 })
  }

  if (!data || !count) {
    return { data: data ?? [], count: count ?? 0 }
  }
  return { data, count }
}

export const getFilteredQuizData = async (
  filterProps: QuizFilterProps
): Promise<DBQuizView[]> => {
  const supabase = getSupabaseInstance()
  let query = supabase.from('quiz_view').select('*')
  if (filterProps.id) {
    query = query.eq('id', filterProps.id)
  }
  if (filterProps.userId) {
    query = query.eq('creator_id', filterProps.userId)
  }
  const { data, error } = await query
  if (error) throw new Error(error.message, { cause: 502 })
  return data
}

export const deleteQuizById = async (
  quizId: number,
  userId: string
): Promise<true> => {
  const supabase = getSupabaseInstance()
  const { error } = await supabase
    .from('quiz')
    .delete()
    .eq('id', quizId)
    .eq('creator_id', userId)
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return true
}

export const saveNewQuizToDB = async (
  userId: string,
  quizData: NewQuizRequest
): Promise<DBQuizView> => {
  const supabase = getSupabaseInstance()
  const { data, error } = await supabase
    .from('quiz')
    .insert([
      {
        title: quizData.title,
        description: quizData.description,
        creator_id: userId,
        is_public: quizData.isPublic,
        is_protected: quizData.isProtected,
        access_code: quizData.accessCode,
        has_accessibility_constrain: quizData.hasAccessibilityConstraint,
        accessible_from: quizData.accessibleFrom,
        accessible_till: quizData.accessibleTill,
        has_time_limit: quizData.hasTimeLimit,
        time_limit_in_minutes: quizData.hasTimeLimit
          ? quizData.timeLimitInMinutes
          : 30, // Default to 30 minutes
        topic_id: quizData.topicId ?? null,
        subject_id: quizData.subjectId ?? null
      }
    ])
    .select('*')

  if (error) throw new Error(error.message, { cause: 502 })

  const savedQuiz = await getFilteredQuizData({ userId, id: data[0].id })
  return savedQuiz[0]
}

export const updateQuizInDB = async (
  userId: string,
  quizData: Quiz
): Promise<DBQuizView> => {
  let dbUpdateData = {
    title: quizData.title,
    description: quizData.description,
    creator_id: userId,
    is_public: quizData.isPublic,
    is_protected: quizData.isProtected,
    has_accessibility_constrain: quizData.hasAccessibilityConstraint,
    accessible_from: quizData.accessibleFrom,
    accessible_till: quizData.accessibleTill,
    has_time_limit: quizData.hasTimeLimit,
    time_limit_in_minutes: quizData.hasTimeLimit
      ? quizData.timeLimitInMinutes
      : 30, // Default to 30 minutes
    topic_id: quizData.topicId ?? null,
    subject_id: quizData.subjectId ?? null
  }

  const supabase = getSupabaseInstance()
  const { error } = await supabase
    .from('quiz')
    .update(
      quizData.accessCode && quizData.accessCode?.length > 0
        ? { ...dbUpdateData, access_code: quizData.accessCode }
        : { ...dbUpdateData }
    )
    .eq('id', quizData.id)
    .eq('creator_id', quizData.creatorId)

  if (error) throw new Error(error.message, { cause: 502 })

  const updatedQuiz = await getFilteredQuizData({ userId, id: quizData.id })
  return updatedQuiz[0]
}
