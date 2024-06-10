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
import { TopicDropDownArray, TopicView } from '@/lib/topicContacts'
import {
  getTopicDetailsById,
  getTopicOptionsQuery
} from '@/app/api-client/topic/useTopicQuery'
import { useSearchParams } from 'next/navigation'
import {
  Knowledge,
  ExpandKnowledge,
  KnowledgeData
} from '@/lib/knowledgeContracts'
import {
  deleteKnowledgeByIdMutation,
  saveKnowledgeMutation,
  updateKnowledgeMutation
} from '@/app/api-client/knowledge/useKnowledgeMutation'
import {
  getKnowledgeDataByIdQuery,
  getKnowledgeDataQuery
} from '@/app/api-client/knowledge/useKnowledgeQuery'

import * as dash from 'lodash'

interface KnowledgeContext {
  readonly knowledgeModalOpen: boolean
  readonly setKnowledgeModalOpen: Dispatch<SetStateAction<boolean>>
  readonly topicId: number | null
  readonly setTopicId: Dispatch<SetStateAction<number | null>>
  readonly warningModalOpen: boolean
  readonly setWarningModalOpen: Dispatch<SetStateAction<boolean>>
  readonly loading: boolean
  readonly setLoading: Dispatch<SetStateAction<boolean>>
  readonly knowledgeToEdit: Knowledge | null
  readonly setKnowledgeToEdit: Dispatch<SetStateAction<Knowledge | null>>
  readonly knowledgeToDelete: Knowledge | null
  readonly setKnowledgeToDelete: Dispatch<SetStateAction<Knowledge | null>>
  readonly topicOptionList: TopicDropDownArray
  readonly data: KnowledgeData
  readonly setData: Dispatch<SetStateAction<KnowledgeData>>
  readonly page: number
  readonly setPage: Dispatch<SetStateAction<number>>
  readonly pageCount: number
  readonly setPageCount: Dispatch<SetStateAction<number>>
  readonly limit: number
  readonly setLimit: Dispatch<SetStateAction<number>>
  readonly expanded: string | false
  readonly setExpanded: Dispatch<SetStateAction<string | false>>
  readonly topicDetails: TopicView | null
  readonly closeModal: () => void
  readonly fetchData: () => Promise<void>
  readonly saveNewKnowledge: (
    knowledge: ExpandKnowledge
  ) => Promise<string | true>
  readonly updateKnowledgeData: (Knowledge: Knowledge) => Promise<string | true>
  readonly getKnowledgeDataById: (
    id: string,
    setLoadingState: Dispatch<SetStateAction<boolean>>
  ) => Promise<string | true>
  readonly deleteKnowledgeById: () => Promise<void>
}

const knowledgeContext = createContext<KnowledgeContext>({
  knowledgeModalOpen: false,
  setKnowledgeModalOpen: () => {},
  topicId: null,
  setTopicId: () => {},
  warningModalOpen: false,
  setWarningModalOpen: () => {},
  loading: true,
  setLoading: () => {},
  knowledgeToEdit: null,
  setKnowledgeToEdit: () => {},
  knowledgeToDelete: null,
  setKnowledgeToDelete: () => {},
  topicDetails: null,
  topicOptionList: [],
  data: [],
  setData: () => {},
  page: 1,
  setPage: () => {},
  pageCount: 0,
  setPageCount: () => {},
  limit: 25,
  setLimit: () => {},
  expanded: false,
  setExpanded: () => {},
  closeModal: () => {},
  fetchData: () => {
    return Promise.resolve(undefined)
  },
  saveNewKnowledge: (knowledge: ExpandKnowledge) => {
    return Promise.resolve('')
  },
  updateKnowledgeData: (knowledge: Knowledge) => {
    return Promise.resolve('')
  },
  getKnowledgeDataById: async (
    id: string,
    setLoadingState: Dispatch<SetStateAction<boolean>>
  ) => {
    return Promise.resolve('')
  },
  deleteKnowledgeById: () => {
    return Promise.resolve(undefined)
  }
})

export const KnowledgeProvider = ({
  children
}: {
  readonly children: ReactNode
}): ReactElement => {
  const searchParams = useSearchParams()
  const currentPage = searchParams?.get('page')
  const currentLimit = searchParams?.get('limit')

  const [knowledgeModalOpen, setKnowledgeModalOpen] = useState<boolean>(false)
  const [topicId, setTopicId] = useState<number | null>(null)
  const [data, setData] = useState<KnowledgeData>([])
  const [page, setPage] = useState<number>(
    currentPage ? Number(currentPage) : 1
  )
  const [pageCount, setPageCount] = useState<number>(0)
  const [limit, setLimit] = useState<number>(
    currentLimit ? Number(currentLimit) : 25
  )
  const [expanded, setExpanded] = useState<string | false>(false)

  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [knowledgeToEdit, setKnowledgeToEdit] = useState<Knowledge | null>(null)
  const [knowledgeToDelete, setKnowledgeToDelete] = useState<Knowledge | null>(
    null
  )
  const [topicDetails, setTopicDetails] = useState<TopicView | null>(null)
  const [topicOptionList, setTopicOptionList] = useState<TopicDropDownArray>([])

  const getTopicDetails = async () => {
    if (topicId) {
      const outcome = await getTopicDetailsById(topicId)
      if (typeof outcome != 'string') setTopicDetails(outcome)
    }
  }

  const getTopicOptionList = async () => {
    const outcome = await getTopicOptionsQuery()
    if (typeof outcome == 'string') {
      console.error(outcome)
    } else {
      setTopicOptionList(outcome)
    }
  }

  const fetchData = async () => {
    if (topicId) {
      const outcome = await getKnowledgeDataQuery({ topicId, page, limit })
      if (typeof outcome != 'string') {
        setData(outcome.data)
        setPageCount(outcome.count)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    const getAsyncData = async () => {
      if (data.length === 0) {
        await fetchData()
      }
      if (!topicDetails) {
        await getTopicDetails()
      }
      // if (topicOptionList.length == 0) {
      //   await getTopicOptionList()
      // }
    }
    getAsyncData()
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId])

  const closeModal = () => {
    setKnowledgeModalOpen(false)
    setWarningModalOpen(false)
    setKnowledgeToDelete(null)
    setKnowledgeToEdit(null)
  }

  const deleteKnowledgeById = async (): Promise<void> => {
    if (knowledgeToDelete) {
      const outcome = await deleteKnowledgeByIdMutation(knowledgeToDelete?.id)
      if (typeof outcome == 'string') {
        console.error(outcome)
      } else {
        setData(data.filter((item) => item.id != knowledgeToDelete.id))
      }
      setWarningModalOpen(false)
      setKnowledgeToDelete(null)
    } else {
      console.error('NO DATA SELECTED TO DELETE')
    }
  }

  const saveNewKnowledge = async (
    knowledge: ExpandKnowledge
  ): Promise<true | string> => {
    const outcome = await saveKnowledgeMutation(knowledge)
    if (typeof outcome === 'string') {
      return outcome
    }
    setData([outcome, ...data])
    return true
  }

  const updateKnowledgeData = async (
    knowledge: Knowledge
  ): Promise<string | true> => {
    const isSame = dash.isEqual(knowledge, knowledgeToEdit)
    if (isSame) return true
    const outcome = await updateKnowledgeMutation(knowledge)
    if (typeof outcome == 'string') {
      return outcome
    }

    setData(
      data.map((item: Knowledge) => {
        if (item.id == outcome.id) {
          return outcome
        }
        return item
      })
    )
    setKnowledgeToEdit(null)
    return true
  }

  const getKnowledgeDataById = async (
    id: string,
    setLoadingState: Dispatch<SetStateAction<boolean>>
  ): Promise<true | string> => {
    setLoadingState(true)
    const outcome = await getKnowledgeDataByIdQuery(id)
    if (typeof outcome != 'string') {
      setKnowledgeToEdit(outcome)
    }
    setLoadingState(false)
    return true
  }

  return (
    <knowledgeContext.Provider
      value={{
        knowledgeModalOpen,
        setKnowledgeModalOpen,
        topicId,
        setTopicId,
        warningModalOpen,
        setWarningModalOpen,
        loading,
        setLoading,
        knowledgeToEdit,
        setKnowledgeToEdit,
        knowledgeToDelete,
        setKnowledgeToDelete,
        topicDetails,
        topicOptionList,
        data,
        setData,
        page,
        setPage,
        pageCount,
        setPageCount,
        limit,
        setLimit,
        expanded,
        setExpanded,
        closeModal,
        fetchData,
        getKnowledgeDataById,
        saveNewKnowledge,
        updateKnowledgeData,
        deleteKnowledgeById
      }}
    >
      {children}
    </knowledgeContext.Provider>
  )
}

export const useKnowledgeContext = (): KnowledgeContext => {
  const context = useContext(knowledgeContext)
  return context
}
