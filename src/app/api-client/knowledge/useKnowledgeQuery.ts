import { routeRequestHandler } from '../utils'

export const getKnowledgeDataQuery = async ({
  topicId,
  page,
  limit
}: {
  topicId: number
  page: number
  limit: number
}) => {
  const response = await routeRequestHandler({
    path: '/knowledge/' + topicId + `?page=${page}&limit=${limit}`,
    method: 'GET'
  })
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    const error = await response.json()
    return error
  }
}

export const getKnowledgeDataByIdQuery = async (id: string) => {
  const response = await routeRequestHandler({
    path: `/knowledge/details/${id}`,
    method: 'GET'
  })
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    const error = await response.json()
    return error
  }
}
