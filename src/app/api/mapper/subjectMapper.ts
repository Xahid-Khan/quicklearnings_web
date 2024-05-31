import { Subject } from '@/src/lib/data_types'
import {
  SubjectDropDownArray,
  Subject as TargetSubject,
  subject,
  subjectDropDownArray
} from '@/src/lib/subjectContracts'

export const dataToSubjectContract = (data: Subject): TargetSubject => {
  const parsedData = subject.parse({
    id: data.id,
    created_at: data.created_at,
    updated_at: data.updated_at,
    title: data.title,
    description: data.description,
    isPublic: data.is_public,
    userId: data.user_id,
    firstName: data.first_name
  })
  return parsedData
}

export const dataArrayToSubjectContract = (
  dataArray: Subject[]
): TargetSubject[] => {
  const parsedData = dataArray.map((data) => {
    return dataToSubjectContract(data)
  })
  return parsedData
}

export const dataToSubjectOptions = (
  dataArray: Subject[]
): SubjectDropDownArray => {
  const parsedData = subjectDropDownArray.parse(
    dataArray.map((data) => ({
      id: data.id,
      title: data.title
    }))
  )
  return parsedData
}
