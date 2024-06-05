import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import { NextRequest, NextResponse } from 'next/server'
import { ErrorResponse } from '@/lib/data_types'
import { getUserId } from '@/app/api/utils'
import { deleteQuizById } from '@/app/api/quiz/quiz'

export const dynamic = 'force-dynamic'

interface DeleteQuizProps {
  quizId: number
  userId: string
}

export async function DELETE(
  req: NextRequest
): Promise<NextResponse<true | ErrorResponse>> {
  try {
    const parsedData = (await req.json()) as DeleteQuizProps
    const userId = await getUserId()
    if (!parsedData.quizId)
      throw new Error('Invalid Data Type Provided', { cause: 400 })
    if (parsedData.userId != userId)
      throw new Error('Authorised action', { cause: 401 })
    const data = await deleteQuizById(parsedData.quizId, userId)
    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
