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
import {
  NewQuizRequest,
  Quiz,
  QuizView,
  QuizViewArray,
  UpdateQuiz
} from '@/lib/quizContracts'
import { getPaginatedQuizDataQuery } from '@/app/api-client/quiz/useQuizQuery'
import {
  addQuizMutation,
  deleteQuizMutation,
  updateQuizMutation
} from '@/app/api-client/quiz/useQuizMutation'

interface QuizContext {
  readonly loading: boolean
  readonly setLoading: Dispatch<SetStateAction<boolean>>
  readonly quizPageData: QuizViewArray
  readonly setQuizPageData: Dispatch<SetStateAction<QuizViewArray>>
  readonly page: number
  readonly setPage: Dispatch<SetStateAction<number>>
  readonly limit: number
  readonly setLimit: Dispatch<SetStateAction<number>>
  readonly dataCount: number
  readonly setDataCount: Dispatch<SetStateAction<number>>
  readonly warningModalOpen: boolean
  readonly setWarningModalOpen: Dispatch<SetStateAction<boolean>>
  readonly quizModalOpen: boolean
  readonly setQuizModalOpen: Dispatch<SetStateAction<boolean>>
  readonly quizToEdit: QuizView | null
  readonly setQuizToEdit: Dispatch<SetStateAction<QuizView | null>>
  readonly quizToDelete: QuizView | null
  readonly setQuizToDelete: Dispatch<SetStateAction<QuizView | null>>
  readonly getUpdatedQuizPageData: () => void
  readonly closeModals: () => void
  readonly deleteQuizPermanently: () => void
  readonly addNewQuiz: (
    addNewQuiz: NewQuizRequest
  ) => Promise<string | undefined>
  readonly updateQuizData: (
    addNewQuiz: UpdateQuiz,
    accessCode: string
  ) => Promise<string | undefined>
}

export const quizContext = createContext<QuizContext>({
  loading: true,
  setLoading: () => {},
  quizPageData: [],
  setQuizPageData: () => {},
  page: 1,
  setPage: () => {},
  limit: 25,
  setLimit: () => {},
  dataCount: 0,
  setDataCount: () => {},
  warningModalOpen: false,
  setWarningModalOpen: () => {},
  quizModalOpen: false,
  setQuizModalOpen: () => {},
  quizToDelete: null,
  setQuizToDelete: () => {},
  quizToEdit: null,
  setQuizToEdit: () => {},
  getUpdatedQuizPageData: () => {},
  closeModals: () => {},
  deleteQuizPermanently: async () => {},
  addNewQuiz: async (addNewQuiz: NewQuizRequest) => {
    return Promise.resolve(undefined)
  },
  updateQuizData: async (addNewQuiz: UpdateQuiz, accessCode: string) => {
    return Promise.resolve(undefined)
  }
})

export const QuizProvider = ({
  children
}: {
  readonly children: ReactNode
}): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true)
  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(false)
  const [quizModalOpen, setQuizModalOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(25)
  const [dataCount, setDataCount] = useState<number>(0)
  const [quizPageData, setQuizPageData] = useState<QuizViewArray>([])
  const [quizToDelete, setQuizToDelete] = useState<QuizView | null>(null)
  const [quizToEdit, setQuizToEdit] = useState<QuizView | null>(null)

  const getUpdatedQuizPageData = async () => {
    setLoading(true)
    const outcome = await getPaginatedQuizDataQuery({ page, limit })
    if (typeof outcome == 'string') {
      console.error(outcome)
      setQuizPageData([])
      setLoading(false)
      return
    }
    setDataCount(outcome.count)
    setQuizPageData(outcome.data)
    setLoading(false)
    return
  }

  useEffect(() => {
    getUpdatedQuizPageData()
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const closeModals = () => {
    setWarningModalOpen(false)
    setQuizToEdit(null)
    setQuizToDelete(null)
    setQuizModalOpen(false)
  }

  const deleteQuizPermanently = async () => {
    if (quizToDelete) {
      const outcome = await deleteQuizMutation(
        quizToDelete.id,
        quizToDelete.creatorId
      )
      if (typeof outcome == 'string') {
        console.error(outcome)
      } else {
        setQuizPageData(
          quizPageData.filter((quiz) => quiz.id != quizToDelete.id)
        )
      }
      closeModals()
    } else {
      console.error('NO DATA FOUND TO DELETE')
    }
    return
  }

  const addNewQuiz = async (
    newQuiz: NewQuizRequest
  ): Promise<string | undefined> => {
    const outcome = await addQuizMutation(newQuiz)
    if (typeof outcome == 'string') {
      return outcome
    }
    setQuizPageData([outcome, ...quizPageData])
    return
  }

  const updateQuizData = async (
    quizData: UpdateQuiz,
    accessCode: string
  ): Promise<string | undefined> => {
    const outcome = await updateQuizMutation({ ...quizData, accessCode })
    if (typeof outcome == 'string') {
      return outcome
    }
    setQuizPageData(
      quizPageData.map((item) => {
        if (item.id == outcome.id) {
          return outcome
        } else {
          return item
        }
      })
    )
    return
  }

  return (
    <quizContext.Provider
      value={{
        loading,
        setLoading,
        quizPageData,
        setQuizPageData,
        page,
        setPage,
        limit,
        setLimit,
        dataCount,
        setDataCount,
        warningModalOpen,
        setWarningModalOpen,
        quizModalOpen,
        setQuizModalOpen,
        quizToEdit,
        setQuizToEdit,
        quizToDelete,
        setQuizToDelete,
        getUpdatedQuizPageData,
        closeModals,
        deleteQuizPermanently,
        addNewQuiz,
        updateQuizData
      }}
    >
      {children}
    </quizContext.Provider>
  )
}

export const useQuizContext = (): QuizContext => {
  const context = useContext(quizContext)
  return context
}
