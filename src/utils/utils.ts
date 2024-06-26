import { NextRequest } from 'next/server'
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/app/api/constants'

export const getPaginationParams = (
  req: NextRequest
): { page: number; limit: number } => {
  const searchParams = new URLSearchParams(new URL(req.url).searchParams)
  const pageParam = searchParams.get('page')
  const page = pageParam ? Number(pageParam) - 1 : 0
  const limitParam = searchParams.get('limit')
  const limit = limitParam ? Number(limitParam) : 25
  return { page, limit }
}

export const validateEmail = (email: string): Boolean => {
  return EMAIL_REGEX.test(email)
}

export const validatePassword = (password: string): Boolean => {
  return PASSWORD_REGEX.test(password)
}
