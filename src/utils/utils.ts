import { NextRequest } from 'next/server'

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
