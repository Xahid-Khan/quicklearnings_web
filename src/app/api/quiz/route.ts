import { NextRequest, NextResponse } from 'next/server'
import { getQuizData, getQuizOptions } from '@/src/app/api/quiz/quiz'
import { getErrorResponseWithStatusCode } from '@/src/lib/errorHander'
import {
  ErrorResponse,
  QuizOptionResponse,
  QuizViewData
} from '@/src/lib/data_types'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest
): Promise<NextResponse<QuizOptionResponse | QuizViewData[] | ErrorResponse>> {
  try {
    const searchParams = new URLSearchParams(new URL(req.url).searchParams)
    const languageId = searchParams.get('languageId')
    const topicId = searchParams.get('topicId')
    const limit = searchParams.get('limit') ?? 30
    if (languageId && topicId && limit) {
      const data = await getQuizData({ languageId, topicId, limit })
      return NextResponse.json(data, { status: 200 })
    } else {
      const { languages, topics } = await getQuizOptions({
        languageId,
        topicId
      })
      return NextResponse.json({ languages, topics }, { status: 200 })
    }
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
