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

interface QuizDataResponse {
  data: QuizData[]
  count: number
}

interface ErrorResponse {
  message: string
}
