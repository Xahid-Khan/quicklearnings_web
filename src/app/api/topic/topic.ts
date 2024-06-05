import { Topic } from '@/lib/data_types'
import { AddTopic, EditTopic, TopicView } from '@/lib/topicContacts'
import getSupabaseInstance from '@/utils/config'
import { getUserId, getUserIdOrNull } from '@/app/api/utils'

interface TopicParams {
  subjectId: string | number
  topicId?: string | number
  currentUserId?: string
}

export const getAllTopics = async ({
  subjectId,
  topicId,
  currentUserId
}: TopicParams): Promise<Topic[]> => {
  const supabase = getSupabaseInstance()
  const userId = currentUserId ?? (await getUserIdOrNull())
  let query = supabase.from('topic_view').select('*')

  // Get all for the user and the public ones
  if (userId) {
    query = query.or(`is_public.eq.true,and(user_id.eq.${userId})`)
  } else {
    // Get only those which are public
    query = query.eq('is_public', true)
  }

  // Filter by subject ID
  if (subjectId != 'all') {
    query = query.eq('subject_id', subjectId)
  }

  // Filter by Topic ID
  if (topicId) {
    query = query.eq('id', topicId)
  }

  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return data
}

export const insertNewTopic = async (
  topic: AddTopic,
  userId: string
): Promise<Topic> => {
  const supabase = getSupabaseInstance()
  const { data, error } = await supabase
    .from('topic')
    .insert({
      title: topic.title.trim(),
      description: topic.description.trim(),
      is_public: topic.isPublic,
      user_id: userId,
      subject_id: topic.subjectId
    })
    .select('*')
  if (error) {
    throw new Error(error.message, { cause: 502 })
  } else if (!data[0].id) {
    throw new Error('Failed to save the data, please try again.', {
      cause: '502'
    })
  }

  const getSavedTopic = await getAllTopics({
    subjectId: topic.subjectId,
    topicId: data[0].id
  })
  return getSavedTopic[0]
}

export const updateNewTopic = async (
  topic: EditTopic,
  userId: string
): Promise<Topic> => {
  const supabase = getSupabaseInstance()
  const { error } = await supabase
    .from('topic')
    .update({
      title: topic.title.trim(),
      description: topic.description.trim(),
      is_public: topic.isPublic,
      subject_id: topic.subjectId,
      updated_at: new Date().toUTCString()
    })
    .eq('id', topic.id)
    .eq('user_id', userId)
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }

  const getSavedTopic = await getAllTopics({
    subjectId: topic.subjectId,
    topicId: topic.id
  })
  return getSavedTopic[0]
}

export const deleteTopicById = async (
  topicId: number,
  userId: string
): Promise<true> => {
  const supabase = getSupabaseInstance()
  const { error } = await supabase
    .from('topic')
    .delete()
    .eq('user_id', userId)
    .eq('id', topicId)
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return true
}
