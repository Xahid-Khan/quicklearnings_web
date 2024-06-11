'use client'

import { routeRequestHandler } from '@/app/api-client/utils'
import { KnowledgeViewData } from '@/lib/data_types'
import { QuizView, QuizViewArray } from '@/lib/quizContracts'
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

export interface OptionsProps {
  id: number | null
  question: string | null
  answer: string | null
  hint: string | null
}

interface QuizAttempt {
  readonly loading: boolean
  readonly setLoading: Dispatch<SetStateAction<boolean>>
  readonly quizData: KnowledgeViewData[]
  readonly setQuizData: Dispatch<SetStateAction<KnowledgeViewData[]>>
  readonly options: OptionsProps[]
  readonly setOptions: Dispatch<SetStateAction<OptionsProps[]>>
  readonly selected: OptionsProps | null
  readonly setSelected: Dispatch<SetStateAction<OptionsProps | null>>
  readonly correctAnswer: boolean
  readonly setCorrectAnswer: Dispatch<SetStateAction<boolean>>
  readonly showHint: boolean
  readonly setShowHint: Dispatch<SetStateAction<boolean>>
  readonly finished: boolean
  readonly setFinished: Dispatch<SetStateAction<boolean>>
  readonly showOutcomeModal: boolean
  readonly setShowOutcomeModal: Dispatch<SetStateAction<boolean>>
  readonly fetchQuizData: (
    quizLimit: number,
    subjectId: string | number,
    topicId: string | number
  ) => Promise<void>
  readonly generateOptions: (
    currentIndex: number,
    data: KnowledgeViewData[],
    quizLimit: number
  ) => OptionsProps[]
}

const quizAttemptContext = createContext<QuizAttempt>({
  loading: true,
  setLoading: () => {},
  quizData: [],
  setQuizData: () => {},
  options: [],
  setOptions: () => {},
  selected: null,
  setSelected: () => {},
  correctAnswer: false,
  setCorrectAnswer: () => {},
  showHint: false,
  setShowHint: () => {},
  finished: false,
  setFinished: () => {},
  showOutcomeModal: false,
  setShowOutcomeModal: () => {},
  fetchQuizData: async (
    quizLimit: number,
    subjectId: string | number,
    topicId: string | number
  ) => {
    Promise.resolve(undefined)
  },
  generateOptions: (
    currentIndex: number,
    data: KnowledgeViewData[] = [],
    quizLimit: number
  ): OptionsProps[] => {
    return []
  }
})

export const QuizAttemptProvider = ({
  children
}: {
  readonly children: ReactNode
}): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true)
  const [quizData, setQuizData] = useState<KnowledgeViewData[]>([])
  const [options, setOptions] = useState<OptionsProps[]>([])
  const [selected, setSelected] = useState<OptionsProps | null>(null)
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(false)
  const [showHint, setShowHint] = useState<boolean>(false)
  const [finished, setFinished] = useState<boolean>(false)
  const [showOutcomeModal, setShowOutcomeModal] = useState<boolean>(false)

  const generateOptions = (
    currentIndex: number,
    data: KnowledgeViewData[] = [],
    quizLimit: number
  ): OptionsProps[] => {
    const optionsList: OptionsProps[] = []
    const idTracker: number[] = []
    const currentData = data.length > 0 ? data : quizData
    while (optionsList.length < 3) {
      const randomIndex = Math.floor(Math.random() * quizLimit)
      if (
        currentData[currentIndex].answer != currentData[randomIndex].answer &&
        !idTracker.includes(currentData[randomIndex].id ?? 0)
      ) {
        optionsList.push({
          id: currentData[randomIndex].id,
          answer: currentData[randomIndex].answer,
          hint: currentData[randomIndex].hint,
          question: currentData[randomIndex].question
        })
        idTracker.push(currentData[randomIndex].id ?? 0)
      }
    }
    optionsList.push({
      id: currentData[currentIndex].id,
      answer: currentData[currentIndex].answer,
      hint: currentData[currentIndex].hint,
      question: currentData[currentIndex].question
    })
    const outcome = optionsList.sort(() => Math.random() - 0.5)
    return outcome
  }

  const fetchQuizData = async (
    quizLimit: number,
    subjectId: string | number,
    topicId: string | number
  ) => {
    const response = await routeRequestHandler({
      path: `/quiz/attempt?subjectId=${subjectId}&topicId=${topicId}&limit=${
        quizLimit + 20
      }`,
      method: 'GET'
    })
    if (response.ok) {
      const data: KnowledgeViewData[] = await response.json()
      setQuizData(data)
      const quizOptions = generateOptions(0, data, quizLimit)
      setOptions(quizOptions)
      setLoading(false)
    }
  }

  return (
    <quizAttemptContext.Provider
      value={{
        loading,
        setLoading,
        quizData,
        setQuizData,
        options,
        setOptions,
        selected,
        setSelected,
        correctAnswer,
        setCorrectAnswer,
        showHint,
        setShowHint,
        finished,
        setFinished,
        showOutcomeModal,
        setShowOutcomeModal,
        fetchQuizData,
        generateOptions
      }}
    >
      {children}
    </quizAttemptContext.Provider>
  )
}

export const useQuizAttemptContext = (): QuizAttempt => {
  const context = useContext(quizAttemptContext)
  return context
}
