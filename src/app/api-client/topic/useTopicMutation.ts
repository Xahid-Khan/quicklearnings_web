import { routeRequestHandler } from '@/app/api-client/utils'
import { AddTopic, EditTopic, topicView, TopicView } from '@/lib/topicContacts'

export const addTopicMutation = async (
  newTopic: AddTopic
): Promise<TopicView | string> => {
  const response = await routeRequestHandler({
    method: 'POST',
    path: '/topic/add',
    body: {
      ...newTopic
    }
  })

  if (response.ok) {
    const data = topicView.parse(await response.json())
    return data
  } else {
    const error = await response.json()
    return error.message
  }
}

export const editTopicMutation = async (
  editedTopic: EditTopic
): Promise<TopicView | string> => {
  const response = await routeRequestHandler({
    method: 'PATCH',
    path: '/topic/edit',
    body: {
      ...editedTopic
    }
  })

  if (response.ok) {
    const data = topicView.parse(await response.json())
    return data
  } else {
    const error = await response.json()
    return error.message
  }
}

export const deleteTopicMutation = async (
  topicId: number
): Promise<string | true> => {
  const response = await routeRequestHandler({
    method: 'DELETE',
    path: '/topic/delete',
    body: {
      topicId
    }
  })
  if (response.ok) {
    const outcome = await response.json()
    return outcome
  } else {
    const error = await response.json()
    return error.message
  }
}
