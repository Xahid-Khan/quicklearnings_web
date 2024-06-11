import { Database } from './supabase'

export type Subject = Database['public']['Views']['subject_view']['Row']
export type Topic = Database['public']['Views']['topic_view']['Row']
export type KnowledgeBase =
  Database['public']['Tables']['knowledge_base']['Row']
export type KnowledgeData =
  Database['public']['Tables']['knowledge_base']['Row']
export type KnowledgeViewData =
  Database['public']['Views']['random_knowledge_base']['Row']
export type DBQuizView = Database['public']['Views']['quiz_view']['Row']

export interface KnowledgeDataResponse {
  data: KnowledgeData[]
  count: number
}

export interface ErrorResponse {
  message: string
}

export interface QuizSubjectOption {
  id: number | string
  label: string
}

export interface QuizTopicOption {
  id: number | string
  label: string
  questionsCount: number
}

export interface QuizOptionResponse {
  subjects: QuizSubjectOption[]
  topics: QuizTopicOption[]
}

export interface UserSession {
  session: {
    access_token: string
    expires_at?: number
    expires_in: number
    refresh_token: string
    token_type: string
    user: {
      created_at: string
      email?: string
    }
  } | null
  userId: string | null
}

export const quizTypes = [
  { id: 'multiple_choice', label: 'Multiple Choice' },
  { id: 'practice_hints', label: 'Practice Hints' },
  { id: 'word_formation', label: 'Word Formation' }
  // { id: 'fill_in_blanks', label: 'Fill In The Blanks' },
]

export enum QuizTypes {
  'multiple_choice' = 'Multiple Choice',
  'practice_hints' = 'Practice Hints',
  'word_formation' = 'Word Formation',
  'fill_in_blanks' = 'Fill In The Blanks'
}
