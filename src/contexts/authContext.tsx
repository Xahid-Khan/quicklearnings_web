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

interface AuthModalContext {
  readonly authModalOpen: boolean
  readonly setAuthModalIsOpen: Dispatch<SetStateAction<boolean>>
  readonly signUp: boolean
  readonly setSignUp: Dispatch<SetStateAction<boolean>>
  readonly firstName: string
  readonly setFirstName: Dispatch<SetStateAction<string>>
  readonly lastName: string
  readonly setLastName: Dispatch<SetStateAction<string>>
  readonly email: string
  readonly setEmail: Dispatch<SetStateAction<string>>
  readonly password: string
  readonly setPassword: Dispatch<SetStateAction<string>>
  readonly loading: boolean
  readonly setLoading: Dispatch<SetStateAction<boolean>>
  readonly successful: boolean
  readonly setSuccessful: Dispatch<SetStateAction<boolean>>
  readonly error: string
  readonly setError: Dispatch<SetStateAction<string>>
  readonly resetPassword: boolean
  readonly setResetPassword: Dispatch<SetStateAction<boolean>>
  readonly quizStarted: boolean
  readonly setQuizStarted: Dispatch<SetStateAction<boolean>>
}

const authModalContext = createContext<AuthModalContext>({
  authModalOpen: false,
  setAuthModalIsOpen: () => {},
  signUp: false,
  setSignUp: () => {},
  firstName: '',
  setFirstName: () => {},
  lastName: '',
  setLastName: () => {},
  email: '',
  setEmail: () => {},
  password: '',
  setPassword: () => {},
  loading: false,
  setLoading: () => {},
  successful: false,
  setSuccessful: () => {},
  error: '',
  setError: () => {},
  resetPassword: false,
  setResetPassword: () => {},
  quizStarted: false,
  setQuizStarted: () => {}
})

export const AuthModalProvider = ({
  children
}: {
  readonly children: ReactNode
}): ReactElement => {
  const [authModalOpen, setAuthModalIsOpen] = useState<boolean>(false)
  const [signUp, setSignUp] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [resetPassword, setResetPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [successful, setSuccessful] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [quizStarted, setQuizStarted] = useState<boolean>(false)

  return (
    <authModalContext.Provider
      value={{
        authModalOpen,
        setAuthModalIsOpen,
        signUp,
        setSignUp,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        resetPassword,
        setResetPassword,
        loading,
        setLoading,
        successful,
        setSuccessful,
        error,
        setError,
        quizStarted,
        setQuizStarted
      }}
    >
      {children}
    </authModalContext.Provider>
  )
}

export const useAuthModalContext = (): AuthModalContext => {
  const context = useContext(authModalContext)
  return context
}
