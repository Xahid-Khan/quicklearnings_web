import { NextRequest, NextResponse } from 'next/server'
import { getQuizData, getQuizOptions } from '@/src/app/api/quiz/quiz'
import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'
import {
  ErrorResponse,
  QuizOptionResponse,
  QuizViewData
} from '@/src/lib/data_types'
import { getUserId } from '../utils'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest
): Promise<NextResponse<QuizOptionResponse | QuizViewData[] | ErrorResponse>> {
  try {
    const userId = await getUserId()
    const searchParams = new URLSearchParams(new URL(req.url).searchParams)
    const subjectId = searchParams.get('subjectId')
    const topicId = searchParams.get('topicId')
    const limit = searchParams.get('limit') ?? 30

    if (subjectId && topicId && limit) {
      const data = await getQuizData({ subjectId, topicId, limit })
      return NextResponse.json(data, { status: 200 })
    } else {
      const { subjects, topics } = await getQuizOptions({
        subjectId,
        topicId,
        userId
      })
      return NextResponse.json({ subjects, topics }, { status: 200 })
    }
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
