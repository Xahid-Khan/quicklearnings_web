import { routeRequestHandler } from '@/app/api-client/utils'
import { NewQuizRequest, Quiz, QuizView } from '@/lib/quizContracts'

export const addQuizMutation = async (
  quizData: NewQuizRequest
): Promise<QuizView | string> => {
  const response = await routeRequestHandler({
    method: 'POST',
    path: '/quiz/add-quiz',
    body: { ...quizData }
  })
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    const error = await response.json()
    return error.message
  }
}

export const updateQuizMutation = async (
  quizData: Quiz
): Promise<QuizView | string> => {
  const response = await routeRequestHandler({
    method: 'PUT',
    path: '/quiz/update-quiz',
    body: { ...quizData }
  })
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    const error = await response.json()
    return error.message
  }
}

export const deleteQuizMutation = async (
  quizId: number,
  userId: string
): Promise<true | string> => {
  const response = await routeRequestHandler({
    method: 'DELETE',
    path: '/quiz/delete',
    body: {
      quizId,
      userId
    }
  })
  if (response.ok) {
    return true
  } else {
    const error = await response.json()
    return error.message
  }
}
