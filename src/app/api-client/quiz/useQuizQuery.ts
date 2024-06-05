import { QuizViewResponse } from '@/lib/quizContracts'
import { routeRequestHandler } from '../utils'
import { ErrorResponse } from '@/lib/data_types'

export const getPaginatedQuizDataQuery = async ({
  page,
  limit
}: {
  page: number
  limit: number
}): Promise<QuizViewResponse | string> => {
  const response = await routeRequestHandler({
    method: 'GET',
    path: `/quiz?limit=${limit}&page=${page}`
  })

  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    const error = (await response.json()) as ErrorResponse
    return error.message
  }
}
