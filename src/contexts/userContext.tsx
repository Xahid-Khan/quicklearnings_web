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
import { routeRequestHandler } from '@/app/api-client/utils'
import { getUserQuery } from '@/app/api-client/user/useUserQuery'
import {
  resetPasswordQuery,
  signInUserQuery,
  signUpUserQuery
} from '@/app/api-client/user/useUserMutation'
import { UserSession } from '@/lib/data_types'
import {
  LoginRequest,
  ResetPasswordRequest,
  SignUpRequest
} from '@/lib/authContracts'

interface UserContext {
  userId: string | null
  setUserId: Dispatch<SetStateAction<string | null>>
  loggedIn: boolean
  setLoggedIn: Dispatch<SetStateAction<boolean>>
  session: UserSession | null
  setSession: Dispatch<SetStateAction<UserSession | null>>
  signInUser: ({ email, password }: LoginRequest) => Promise<string | boolean>
  signUpUser: ({
    firstName,
    lastName,
    email,
    password
  }: SignUpRequest) => Promise<string | boolean>
  signOut: () => void
  resetUserPassword: ({
    email,
    redirectTo
  }: ResetPasswordRequest) => Promise<string | boolean>
}

const userContext = createContext<UserContext>({
  userId: null,
  setUserId: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  session: null,
  setSession: () => {},
  signInUser: async ({ email, password, redirectTo }) => {
    return Promise.resolve('')
  },
  signUpUser: async ({ firstName, lastName, email, password, redirectTo }) => {
    return Promise.resolve('')
  },
  signOut: () => {},
  resetUserPassword: async ({ email, redirectTo }: ResetPasswordRequest) => {
    return Promise.resolve('')
  }
})

export const UserProvider = ({
  children
}: {
  readonly children: ReactNode
}): ReactElement => {
  const [userId, setUserId] = useState<string | null>(null)
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [session, setSession] = useState<UserSession | null>(null)

  const getUser = async () => {
    const userData = await getUserQuery()
    if (userData) {
      setUserId(userData.userId ?? null)
      setSession(userData ?? null)
    }
  }
  useEffect(() => {
    getUser()
    return
  }, [])

  const signInUser = async ({
    email,
    password,
    redirectTo
  }: LoginRequest): Promise<boolean | string> => {
    const outcome = await signInUserQuery({
      email,
      password,
      setUserId,
      setSession,
      redirectTo
    })
    return outcome
  }
  const signUpUser = async ({
    firstName,
    lastName,
    email,
    password,
    redirectTo
  }: SignUpRequest): Promise<boolean | string> => {
    const outcome = await signUpUserQuery({
      firstName,
      lastName,
      email,
      password,
      redirectTo
    })
    return outcome
  }
  const signOut = async () => {
    const response = await routeRequestHandler({
      method: 'DELETE',
      path: '/auth/logout'
    })
    if (response.ok) {
      setUserId(null)
      setSession(null)
      setLoggedIn(false)
    }
  }

  const resetUserPassword = async ({
    email,
    redirectTo
  }: ResetPasswordRequest): Promise<boolean | string> => {
    const response = await resetPasswordQuery({ email, redirectTo })
    return response
  }

  return (
    <userContext.Provider
      value={{
        userId,
        setUserId,
        loggedIn,
        setLoggedIn,
        session,
        setSession,
        signInUser,
        signUpUser,
        signOut,
        resetUserPassword
      }}
    >
      {children}
    </userContext.Provider>
  )
}

export const useUserContext = (): UserContext => {
  const context = useContext(userContext)
  return context
}
