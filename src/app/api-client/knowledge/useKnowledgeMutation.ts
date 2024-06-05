import { Knowledge, ExpandKnowledge } from '@/lib/knowledgeContracts'
import { routeRequestHandler } from '@/app/api-client/utils'

export const saveKnowledgeMutation = async (
  knowledge: ExpandKnowledge
): Promise<Knowledge | string> => {
  const response = await routeRequestHandler({
    method: 'POST',
    path: '/knowledge/add',
    body: knowledge
  })

  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    const error = await response.json()
    return error.message
  }
}

export const updateKnowledgeMutation = async (
  knowledge: Knowledge
): Promise<Knowledge | string> => {
  const response = await routeRequestHandler({
    method: 'POST',
    path: '/knowledge/update',
    body: knowledge
  })

  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    const error = await response.json()
    return error.message
  }
}

export const deleteKnowledgeByIdMutation = async (
  id: number
): Promise<true | string> => {
  const response = await routeRequestHandler({
    method: 'DELETE',
    path: '/knowledge/delete',
    body: { knowledgeId: id }
  })

  if (response.ok) {
    return true
  } else {
    const error = await response.json()
    return error.message
  }
}
