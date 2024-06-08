import { DBQuizView } from '@/lib/data_types'
import { quizView, QuizView } from '@/lib/quizContracts'

export const dataToQuizViewContract = (data: DBQuizView): QuizView => {
  const parsedData = quizView.parse({
    id: data.id,
    created_at: data.created_at,
    updated_at: data.updated_at,
    title: data.title,
    description: data.description,
    creatorId: data.creator_id,
    isProtected: data.is_protected,
    isPublic: data.is_public,
    hasAccessibilityConstraint: data.has_accessibility_constrain,
    accessibleFrom: data.accessible_from,
    accessibleTill: data.accessible_till,
    hasTimeLimit: data.has_time_limit,
    timeLimitInMinutes: data.time_limit_in_minutes,
    topicId: data.topic_id,
    subjectId: data.subject_id,
    firstName: data.first_name,
    lastName: data.last_name,
    topicTitle: data.topic_title,
    subjectTitle: data.subject_title
  })
  return parsedData
}

export const dataArrayToQuizViewContract = (data: DBQuizView[]): QuizView[] => {
  const parsedData = data.map((item) => dataToQuizViewContract(item))
  return parsedData
}
