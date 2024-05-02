import { Database } from './supabase'

export type Subject = Database['public']['Tables']['subject']['Row']
export type Topic = Database['public']['Tables']['topic']['Row']
export type QuizData = Database['public']['Tables']['data']['Row']
export type QuizViewData = Database['public']['Views']['random_data']['Row']

export interface QuizDataResponse {
  data: QuizData[]
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
