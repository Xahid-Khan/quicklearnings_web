import { KnowledgeBase } from '@/src/lib/data_types'
import { knowledge, Knowledge } from '@/src/lib/knowledgeContracts'

export const knowledgeBaseToContract = (data: KnowledgeBase): Knowledge => {
  const parsedData = knowledge.parse({
    id: data.id,
    created_at: data.created_at,
    updated_at: data.updated_at,
    prompt: data.question,
    solution: data.answer,
    hint: data.hint,
    notes: data.notes,
    topicId: data.topic_id,
    userId: data.user_id
  })
  return parsedData
}

export const knowledgeBaseArrayToContract = (
  data: KnowledgeBase[]
): Knowledge[] => {
  const parsedData = data.map((item) => knowledgeBaseToContract(item))
  return parsedData
}
