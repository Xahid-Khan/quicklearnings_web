import { KnowledgeBase, QuizData, QuizDataResponse } from '@/src/lib/data_types'
import { Knowledge, ExpandKnowledge } from '@/src/lib/knowledgeContracts'
import getSupabaseInstance from '@/src/utils/config'

export const getKnowledgeDisplayDataByTopicId = async (
  topicId: string,
  limit: number,
  page: number
): Promise<QuizDataResponse> => {
  const from = page * limit
  const supabase = getSupabaseInstance()
  const { data, error, count } = await supabase
    .from('knowledge_base')
    .select('*', { count: 'exact' })
    .eq('topic_id', topicId)
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

export const getKnowledgeDisplayDataById = async (
  id: number
): Promise<QuizData> => {
  const supabase = getSupabaseInstance()
  const { data, error } = await supabase
    .from('knowledge_base')
    .select('*')
    .eq('id', id)

  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return data[0]
}

export const getKnowledgeDataById = async (id: string, userId: string) => {
  const supabase = getSupabaseInstance()
  const { data, error } = await supabase
    .from('knowledge_base')
    .select()
    .eq('user_id', userId)
    .eq('id', id)

  if (error) {
    throw new Error(error.message, { cause: 502 })
  }

  return data[0]
}

export const expandKnowledgeBase = async (
  knowledge: ExpandKnowledge,
  userId: string
): Promise<KnowledgeBase> => {
  const supabase = getSupabaseInstance()
  const { data, error } = await supabase
    .from('knowledge_base')
    .insert([
      {
        question: knowledge.prompt,
        answer: knowledge.solution,
        hint: knowledge.hint,
        notes: knowledge.notes,
        topic_id: knowledge.topicId,
        user_id: userId,
        updated_at: new Date().toISOString()
      }
    ])
    .select()
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return data[0]
}

export const updatedKnowledgeBase = async (
  knowledge: Knowledge,
  userId: string
): Promise<QuizData> => {
  const supabase = getSupabaseInstance()
  const { error } = await supabase
    .from('knowledge_base')
    .update({
      question: knowledge.prompt,
      answer: knowledge.solution,
      hint: knowledge.hint,
      notes: knowledge.notes,
      topic_id: knowledge.topicId,
      user_id: userId,
      updated_at: new Date().toISOString()
    })
    .eq('id', knowledge.id)
    .eq('user_id', userId)

  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  const data = await getKnowledgeDisplayDataById(knowledge.id)
  return data
}

export const deleteKnowledgeById = async (
  id: number,
  userId: string
): Promise<true> => {
  const supabase = getSupabaseInstance()
  const { error } = await supabase
    .from('knowledge_base')
    .delete()
    .eq('user_id', userId)
    .eq('id', id)
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return true
}
