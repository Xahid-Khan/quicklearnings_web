import { Database } from './supabase'

export type Language = Database['public']['Tables']['language']['Row']
export type Topic = Database['public']['Tables']['topic']['Row']
export type QuizData = Database['public']['Tables']['data']['Row']
export type QuizViewData = Database['public']['Views']['random_data']['Row']

// export interface QuizViewData {
//   answer: string
//   created_at: string
//   hint: string
//   id: number
//   notes: string
//   question: string
//   topic_id: number
//   language_id: number
//   user_id: string
// }

export interface QuizDataResponse {
  data: QuizData[]
  count: number
}

export interface ErrorResponse {
  message: string
}

export interface QuizLanguageOption {
  id: number | string
  label: string
}

export interface QuizTopicOption {
  id: number | string
  label: string
}

export interface QuizOptionResponse {
  languages: QuizLanguageOption[]
  topics: QuizTopicOption[]
}
