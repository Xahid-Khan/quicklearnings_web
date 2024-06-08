import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/app/api/utils'
import { quiz } from '@/lib/quizContracts'
import { updateQuizInDB } from '@/app/api/quiz/quiz'
import { dataToQuizViewContract } from '../../mapper/quizMapper'

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const userId = await getUserId()
    const parsedData = quiz.safeParse(await req.json())
    if (!parsedData.success) {
      const parsedError = JSON.parse(parsedData.error.message)
      throw new Error(parsedError[0].message, { cause: 400 })
    }
    if (userId != parsedData.data.creatorId)
      throw new Error('Unauthorised', { cause: 401 })
    const data = await updateQuizInDB(userId, parsedData.data)
    const parsedResponse = dataToQuizViewContract(data)
    return NextResponse.json(parsedResponse, { status: 200 })
  } catch (e) {
    return getErrorResponseWithStatusCode(e, req.nextUrl.pathname)
  }
}
