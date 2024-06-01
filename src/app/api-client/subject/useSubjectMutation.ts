import {
  AddSubject,
  EditSubject,
  subject,
  Subject
} from '@/src/lib/subjectContracts'
import { routeRequestHandler } from '@/src/app/api-client/utils'

export const addSubjectMutation = async (
  newSubject: AddSubject
): Promise<Subject | string> => {
  const response = await routeRequestHandler({
    method: 'POST',
    path: '/subject/add',
    body: {
      ...newSubject
    }
  })

  if (response.ok) {
    const data = subject.parse(await response.json())
    return data
  } else {
    const error = await response.json()
    return error.message
  }
}

export const editSubjectMutation = async (
  editedSubject: EditSubject
): Promise<Subject | string> => {
  const response = await routeRequestHandler({
    method: 'PATCH',
    path: '/subject/edit',
    body: {
      ...editedSubject
    }
  })

  if (response.ok) {
    const data = subject.parse(await response.json())
    return data
  } else {
    const error = await response.json()
    return error.message
  }
}

export const deleteSubjectMutation = async (
  subjectId: number
): Promise<string | true> => {
  const response = await routeRequestHandler({
    method: 'DELETE',
    path: '/subject/delete',
    body: {
      subjectId
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
