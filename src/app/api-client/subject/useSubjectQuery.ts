import { Subject, SubjectDropDownArray } from '@/src/lib/subjectContracts'
import { routeRequestHandler } from '../utils'

export const getSubjects = async (): Promise<Subject[] | string> => {
  const response = await routeRequestHandler({
    method: 'GET',
    path: '/subject'
  })

  if (response.ok) {
    const subjects = await response.json()
    return subjects
  } else {
    const error = await response.json()
    return error.message
  }
}

export const getSubjectOptionsQuery = async (): Promise<
  SubjectDropDownArray | string
> => {
  const response = await routeRequestHandler({
    method: 'GET',
    path: '/subject/option-list'
  })

  if (response.ok) {
    const subjectList = await response.json()
    return subjectList
  } else {
    const error = await response.json()
    return error.message
  }
}
