interface Language {
  id?: string
  title: string
  created_at: {
    seconds: number
    nanoseconds: number
  }
  description?: string
}

interface Topic {
  id?: string
  title: string
  created_at: {
    seconds: number
    nanoseconds: number
  }
  description?: string
}

interface QuizData {
  id: string
  question: string
  answer: string
  hint: string
  created_at: {
    seconds: number
    nanoseconds: number
  }
  notes?: string
}

interface QuizViewData {
  answer: string
  created_at: string
  hint: string
  id: number
  notes: string
  question: string
  topic_id: number
  language_id: number
  user_id: string
}

interface QuizDataResponse {
  data: QuizData[]
  count: number
}

interface ErrorResponse {
  message: string
}

interface QuizLanguageOption {
  id: number | string
  label: string
}

interface QuizTopicOption {
  id: number | string
  label: string
}

interface QuizOptionResponse {
  languages: QuizLanguageOption[]
  topics: QuizTopicOption[]
}
