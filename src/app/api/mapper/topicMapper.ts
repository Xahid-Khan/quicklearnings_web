import { Topic } from '@/src/lib/data_types'
import {
  topicDropDownArray,
  TopicDropDownArray,
  topicView,
  TopicView
} from '@/src/lib/topicContacts'

export const dataToTopicContract = (data: Topic): TopicView => {
  const parsedData = topicView.parse({
    id: data.id,
    created_at: data.created_at,
    updated_at: data.updated_at,
    title: data.title,
    description: data.description,
    isPublic: data.is_public,
    userId: data.user_id,
    firstName: data.first_name,
    subjectId: data.subject_id,
    subjectName: data.subject_name
  })
  return parsedData
}

export const dataArrayToTopicContract = (dataArray: Topic[]): TopicView[] => {
  const parsedData = dataArray.map((data) => {
    return dataToTopicContract(data)
  })
  return parsedData
}

export const dataToTopicOptions = (dataArray: Topic[]): TopicDropDownArray => {
  const parsedData = topicDropDownArray.parse(
    dataArray.map((data) => ({
      id: data.id,
      title: data.title
    }))
  )
  return parsedData
}
