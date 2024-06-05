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
import { AddTopic, EditTopic, TopicView } from '@/lib/topicContacts'
import { getTopicsQuery } from '@/app/api-client/topic/useTopicQuery'
import {
  addTopicMutation,
  deleteTopicMutation,
  editTopicMutation
} from '@/app/api-client/topic/useTopicMutation'
import { SubjectDropDownArray } from '@/lib/subjectContracts'
import { getSubjectOptionsQuery } from '@/app/api-client/subject/useSubjectQuery'

interface TopicContext {
  readonly urlSubjectId: string
  readonly setUrlSubjectId: Dispatch<SetStateAction<string>>
  readonly topicModalOpen: boolean
  readonly setTopicModalOpen: Dispatch<SetStateAction<boolean>>
  readonly warningModalOpen: boolean
  readonly setWarningModalOpen: Dispatch<SetStateAction<boolean>>
  readonly data: TopicView[]
  readonly setData: Dispatch<SetStateAction<TopicView[]>>
  readonly getTopicData: (subjectId: string) => void
  readonly loading: boolean
  readonly setLoading: Dispatch<SetStateAction<boolean>>
  readonly editTopic: TopicView | null
  readonly setEditTopic: Dispatch<SetStateAction<TopicView | null>>
  readonly deleteTopic: TopicView | null
  readonly setDeleteTopic: Dispatch<SetStateAction<TopicView | null>>
  readonly saveNewTopic: ({ title, description, isPublic }: AddTopic) => {}
  readonly saveEditedTopic: ({
    title,
    description,
    isPublic,
    id
  }: EditTopic) => {}
  readonly deleteTopicById: () => void
  readonly closeModal: () => void
  readonly subjectOptions: SubjectDropDownArray
  readonly setSubjectOptions: Dispatch<SetStateAction<SubjectDropDownArray>>
}

const topicContext = createContext<TopicContext>({
  urlSubjectId: 'all',
  setUrlSubjectId: () => {},
  topicModalOpen: false,
  setTopicModalOpen: () => {},
  warningModalOpen: false,
  setWarningModalOpen: () => {},
  data: [],
  setData: () => {},
  getTopicData: (subjectId) => {},
  loading: false,
  setLoading: () => {},
  saveNewTopic: async () => {},
  saveEditedTopic: async () => {},
  deleteTopicById: async () => {},
  editTopic: null,
  setEditTopic: () => {},
  deleteTopic: null,
  setDeleteTopic: () => {},
  closeModal: () => {},
  subjectOptions: [],
  setSubjectOptions: () => {}
})

export const TopicProvider = ({
  children
}: {
  readonly children: ReactNode
}): ReactElement => {
  const [urlSubjectId, setUrlSubjectId] = useState<string>('all')
  const [topicModalOpen, setTopicModalOpen] = useState<boolean>(false)
  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(false)
  const [data, setData] = useState<TopicView[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [editTopic, setEditTopic] = useState<TopicView | null>(null)
  const [deleteTopic, setDeleteTopic] = useState<TopicView | null>(null)
  const [subjectOptions, setSubjectOptions] = useState<SubjectDropDownArray>([])

  const getSubjectOptions = async () => {
    const outcome = await getSubjectOptionsQuery()
    typeof outcome == 'string'
      ? setSubjectOptions([])
      : setSubjectOptions(outcome)
    return
  }
  useEffect(() => {
    getSubjectOptions()
    return
  }, [])

  const getTopicData = async (subjectId: string) => {
    setLoading(true)
    setUrlSubjectId(subjectId)
    const outcome = await getTopicsQuery(subjectId)
    typeof outcome == 'string' ? null : setData(outcome)
    setLoading(false)
    return
  }

  const closeModal = () => {
    setTopicModalOpen(false)
    setEditTopic(null)
    return
  }

  //This method would return the saved TOPIC and that would be appended to the Topics data
  const saveNewTopic = async (
    newTopic: AddTopic
  ): Promise<TopicView | string> => {
    const outcome = await addTopicMutation(newTopic)
    typeof outcome == 'string' ? null : setData([outcome, ...data])
    return outcome
  }

  //This method would return the Edited TOPIC and that would be appended to the Topics data
  const saveEditedTopic = async (
    editedTopic: EditTopic
  ): Promise<TopicView | string> => {
    const outcome = await editTopicMutation(editedTopic)
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

  const deleteTopicById = async (): Promise<void> => {
    const outcome = deleteTopic
      ? await deleteTopicMutation(deleteTopic.id)
      : 'No Item Selected'
    if (outcome == true) {
      setData(data.filter((topic) => topic.id != deleteTopic?.id))
      setWarningModalOpen(false)
      setDeleteTopic(null)
    }
  }

  return (
    <topicContext.Provider
      value={{
        urlSubjectId,
        setUrlSubjectId,
        topicModalOpen,
        setTopicModalOpen,
        warningModalOpen,
        setWarningModalOpen,
        data,
        setData,
        getTopicData,
        loading,
        setLoading,
        closeModal,
        editTopic,
        setEditTopic,
        deleteTopic,
        setDeleteTopic,
        saveNewTopic,
        saveEditedTopic,
        deleteTopicById,
        subjectOptions,
        setSubjectOptions
      }}
    >
      {children}
    </topicContext.Provider>
  )
}

export const useTopicContext = (): TopicContext => {
  const context = useContext(topicContext)
  return context
}
