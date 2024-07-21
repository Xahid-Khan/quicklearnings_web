'use client'
import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'

interface CustomQuizContext {
  readonly openCustomQuizModal: boolean
  readonly setOpenCustomQuizModal: Dispatch<SetStateAction<boolean>>
  readonly closeModal: () => void
}

const customQuizContext = createContext<CustomQuizContext>({
  openCustomQuizModal: false,
  setOpenCustomQuizModal: () => {},
  closeModal: () => {}
})

export const CustomQuizProvider = ({
  children
}: {
  children: ReactNode
}): ReactElement => {
  const [openCustomQuizModal, setOpenCustomQuizModal] = useState<boolean>(false)

  const closeModal = () => {
    setOpenCustomQuizModal(false)
  }

  return (
    <customQuizContext.Provider
      value={{ openCustomQuizModal, setOpenCustomQuizModal, closeModal }}
    >
      {children}
    </customQuizContext.Provider>
  )
}

export const useCustomQuizContext = (): CustomQuizContext => {
  const context = useContext(customQuizContext)
  return context
}
