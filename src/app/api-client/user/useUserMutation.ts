import { Dispatch, SetStateAction } from 'react'
import { routeRequestHandler } from '@/app/api-client/utils'
import { UserSession } from '@/lib/data_types'
import { ResetPasswordRequest, SignUpRequest } from '@/lib/authContracts'

interface SignInUserProps {
  email: string
  password: string
  setUserId: Dispatch<SetStateAction<string | null>>
  setSession: Dispatch<SetStateAction<UserSession | null>>
  redirectTo: string
}

export const signUpUserQuery = async ({
  firstName,
  lastName,
  email,
  password,
  redirectTo
}: SignUpRequest): Promise<boolean | string> => {
  const response = await routeRequestHandler({
    method: 'POST',
    path: '/auth/signup',
    body: {
      firstName,
      lastName,
      email,
      password,
      redirectTo
    }
  })
  if (response.ok) {
    return true
  } else {
    const error = await response.json()
    return error.message
  }
}

export const signInUserQuery = async ({
  email,
  password,
  setUserId,
  setSession,
  redirectTo
}: SignInUserProps): Promise<boolean | string> => {
  const response = await routeRequestHandler({
    method: 'POST',
    path: '/auth/login',
    body: {
      email,
      password,
      redirectTo
    }
  })

  if (response.ok) {
    const userData = (await response.json()) as UserSession
    setUserId(userData.userId)
    setSession(userData)
    return true
  } else {
    const error = await response.json()
    setUserId(null)
    setSession(null)
    return error.message
  }
}

export const resetPasswordQuery = async ({
  email,
  redirectTo
}: ResetPasswordRequest): Promise<boolean | string> => {
  const response = await routeRequestHandler({
    method: 'POST',
    path: '/auth/pw-reset',
    body: {
      email,
      redirectTo
    }
  })

  if (response.ok) {
    return true
  } else {
    const error = await response.json()
    return error.message
  }
}
