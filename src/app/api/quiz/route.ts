import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import { NextRequest, NextResponse } from 'next/server'
import { getUserIdOrNull } from '@/app/api/utils'
import { DBQuizView, ErrorResponse } from '@/lib/data_types'
import { getPaginatedQuizData } from '@/app/api/quiz/quiz'
import { getPaginationParams } from '@/utils/utils'
import { dataArrayToQuizViewContract } from '@/app/api/mapper/quizMapper'
import { QuizViewResponse } from '@/lib/quizContracts'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest
): Promise<NextResponse<QuizViewResponse | ErrorResponse>> {
  try {
    const userId = await getUserIdOrNull()
    const { page, limit } = getPaginationParams(req)
    if (userId) {
      const { data, count }: { data: DBQuizView[]; count: number } =
        await getPaginatedQuizData(userId, page, limit)
      const parsedData = dataArrayToQuizViewContract(data)
      return NextResponse.json(
        { data: parsedData, count: Math.ceil(count / limit) },
        { status: 200 }
      )
    }
    return NextResponse.json(
      { message: 'Please log in to access the Quizzes' },
      { status: 401 }
    )
  } catch (e) {
    return getErrorResponseWithStatusCode(e, req.nextUrl.pathname)
  }
}
