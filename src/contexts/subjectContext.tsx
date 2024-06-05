'use client'
import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import { AddSubject, EditSubject, Subject } from '@/lib/subjectContracts'
import {
  addSubjectMutation,
  deleteSubjectMutation,
  editSubjectMutation
} from '@/app/api-client/subject/useSubjectMutation'
import { getSubjects } from '@/app/api-client/subject/useSubjectQuery'
import { useUserContext } from './userContext'

interface SubjectContext {
  readonly subjectModalOpen: boolean
  readonly setSubjectModalOpen: Dispatch<SetStateAction<boolean>>
  readonly warningModalOpen: boolean
  readonly setWarningModalOpen: Dispatch<SetStateAction<boolean>>
  readonly data: Subject[]
  readonly setData: Dispatch<SetStateAction<Subject[]>>
  readonly loading: boolean
  readonly setLoading: Dispatch<SetStateAction<boolean>>
  readonly editSubject: Subject | null
  readonly setEditSubject: Dispatch<SetStateAction<Subject | null>>
  readonly saveNewSubject: ({ title, description, isPublic }: AddSubject) => {}
  readonly deleteSubject: Subject | null
  readonly setDeleteSubject: Dispatch<SetStateAction<Subject | null>>
  readonly saveEditedSubject: ({
    title,
    description,
    isPublic,
    id
  }: EditSubject) => {}
  readonly closeModal: () => void
  readonly deleteSubjectById: () => void
}

const subjectContext = createContext<SubjectContext>({
  subjectModalOpen: false,
  setSubjectModalOpen: () => {},
  warningModalOpen: false,
  setWarningModalOpen: () => {},
  data: [],
  setData: () => {},
  loading: false,
  setLoading: () => {},
  saveNewSubject: async () => {},
  saveEditedSubject: async () => {},
  editSubject: null,
  setEditSubject: () => {},
  closeModal: () => {},
  deleteSubject: null,
  setDeleteSubject: () => {},
  deleteSubjectById: async () => {}
})

export const SubjectProvider = ({
  children
}: {
  readonly children: ReactNode
}): ReactElement => {
  const [subjectModalOpen, setSubjectModalOpen] = useState<boolean>(false)
  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(false)
  const [data, setData] = useState<Subject[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [editSubject, setEditSubject] = useState<Subject | null>(null)
  const [deleteSubject, setDeleteSubject] = useState<Subject | null>(null)

  const { userId } = useUserContext()

  const getSubjectData = async () => {
    setLoading(true)
    const outcome = await getSubjects()
    typeof outcome == 'string' ? null : setData(outcome)
    setLoading(false)
  }

  useEffect(() => {
    getSubjectData()
    return
  }, [userId])

  const closeModal = () => {
    setSubjectModalOpen(false)
    setEditSubject(null)
  }

  //This method would return the saved subject and that would be appended to the subjects
  const saveNewSubject = async (
    newSubject: AddSubject
  ): Promise<Subject | string> => {
    const outcome = await addSubjectMutation(newSubject)
    typeof outcome == 'string' ? null : setData([outcome, ...data])
    return outcome
  }

  //This method would return the Edited subject and that would be appended to the subjects
  const saveEditedSubject = async (
    editedSubject: EditSubject
  ): Promise<Subject | string> => {
    const outcome = await editSubjectMutation(editedSubject)
    typeof outcome == 'string'
      ? null
      : setData(
          data.map((item) => {
            if (item.id == outcome.id) {
              return outcome
            }
            return item
          })
        )
    return outcome
  }

  const deleteSubjectById = async (): Promise<void> => {
    const outcome = deleteSubject
      ? await deleteSubjectMutation(deleteSubject.id)
      : 'No Item Selected'
    if (outcome == true) {
      setData(data.filter((subject) => subject.id != deleteSubject?.id))
      setWarningModalOpen(false)
      setDeleteSubject(null)
    }
  }

  return (
    <subjectContext.Provider
      value={{
        subjectModalOpen,
        setSubjectModalOpen,
        warningModalOpen,
        setWarningModalOpen,
        data,
        setData,
        loading,
        setLoading,
        closeModal,
        editSubject,
        deleteSubject,
        setDeleteSubject,
        setEditSubject,
        saveNewSubject,
        saveEditedSubject,
        deleteSubjectById
      }}
    >
      {children}
    </subjectContext.Provider>
  )
}

export const useSubjectContext = (): SubjectContext => {
  const context = useContext(subjectContext)
  return context
}
