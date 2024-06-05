import { Subject } from '@/lib/data_types'
import getSupabaseInstance from '@/utils/config'
import { getUserId, getUserIdOrNull } from '@/app/api/utils'
import { AddSubject, EditSubject } from '@/lib/subjectContracts'

export const getAllSubjects = async ({
  subjectId,
  currentUserId,
  showPublic = true
}: {
  subjectId?: number
  currentUserId?: string
  showPublic?: boolean
}): Promise<Subject[]> => {
  const userId = currentUserId ?? (await getUserIdOrNull())
  const supabase = getSupabaseInstance()

  let query = supabase.from('subject_view').select('*')
  // Get all for the user and the public ones
  if (userId) {
    query = query.or(`is_public.eq.${showPublic},and(user_id.eq.${userId})`)
  } else {
    // Get only those which are public
    query = query.eq('is_public', showPublic)
  }
  // Filter by subject ID
  if (subjectId) query = query.eq('id', subjectId)

  const { data, error } = await query
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return data
}

export const insertNewSubject = async (
  subject: AddSubject
): Promise<Subject> => {
  const supabase = getSupabaseInstance()
  const userId = await getUserId()
  const { data, error } = await supabase
    .from('subject')
    .insert({
      title: subject.title.trim(),
      description: subject.description.trim(),
      is_public: subject.isPublic,
      user_id: userId
    })
    .select('*')
  if (error) {
    throw new Error(error.message, { cause: 502 })
  } else if (!data[0].id) {
    throw new Error('Failed to save the data, please try again.', {
      cause: '502'
    })
  }

  const getSavedSubject = await getAllSubjects({ subjectId: data[0].id })
  return getSavedSubject[0]
}

export const updateNewSubject = async (
  subject: EditSubject
): Promise<Subject> => {
  const supabase = getSupabaseInstance()
  const userId = await getUserId()
  const { error } = await supabase
    .from('subject')
    .update({
      title: subject.title.trim(),
      description: subject.description.trim(),
      is_public: subject.isPublic,
      updated_at: new Date().toISOString()
    })
    .eq('id', subject.id)
    .eq('user_id', userId)
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }

  const getSavedSubject = await getAllSubjects({ subjectId: subject.id })
  return getSavedSubject[0]
}

export const deleteSubjectById = async (
  subjectId: number,
  userId: string
): Promise<true> => {
  const supabase = getSupabaseInstance()
  const { error } = await supabase
    .from('subject')
    .delete()
    .eq('user_id', userId)
    .eq('id', subjectId)
  if (error) {
    throw new Error(error.message, { cause: 502 })
  }
  return true
}
