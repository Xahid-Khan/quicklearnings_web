import { ErrorResponse } from '@/lib/data_types'
import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import { newQuizRequest, QuizView } from '@/lib/quizContracts'
import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/app/api/utils'
import { saveNewQuizToDB } from '@/app/api/quiz/quiz'
import { dataToQuizViewContract } from '../../mapper/quizMapper'

export async function POST(
  req: NextRequest
): Promise<NextResponse<QuizView | ErrorResponse>> {
  try {
    const userId = await getUserId()
    const parsedData = newQuizRequest.safeParse(await req.json())
    if (!parsedData.success) {
      const parsedError = JSON.parse(parsedData.error.message)
      throw new Error(parsedError[0].message, { cause: 400 })
    }

    const savedItem = await saveNewQuizToDB(userId, parsedData.data)
    const parsedQuiz = dataToQuizViewContract(savedItem)
    return NextResponse.json(parsedQuiz, { status: 200 })
  } catch (e) {
    return getErrorResponseWithStatusCode(e, req.nextUrl.pathname)
  }
}
