import { TopicDropDownArray, TopicView } from '@/lib/topicContacts'
import { routeRequestHandler } from '../utils'

export const getTopicsQuery = async (
  subjectId: string
): Promise<TopicView[] | string> => {
  const response = await routeRequestHandler({
    method: 'GET',
    path: '/topic/' + subjectId
  })

  if (response.ok) {
    const topics = await response.json()
    return topics
  } else {
    const error = await response.json()
    return error.message
  }
}

export const getTopicDetailsById = async (
  topicId: number | string
): Promise<TopicView | string> => {
  const response = await routeRequestHandler({
    method: 'GET',
    path: `/topic/details/${topicId}`
  })
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    const error = await response.json()
    return error.message
  }
}

export const getTopicOptionsQuery = async (): Promise<
  TopicDropDownArray | string
> => {
  const response = await routeRequestHandler({
    method: 'GET',
    path: '/topic/option-list'
  })

  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    const error = await response.json()
    return error.message
  }
}
