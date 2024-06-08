import { NextRequest, NextResponse } from 'next/server'
import { getQuizData, getQuizOptions } from '@/app/api/quiz/quiz'
import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import {
  ErrorResponse,
  QuizOptionResponse,
  KnowledgeViewData
} from '@/lib/data_types'
import { getUserId } from '@/app/api/utils'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest
): Promise<
  NextResponse<QuizOptionResponse | KnowledgeViewData[] | ErrorResponse>
> {
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
