import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'
import { NextRequest, NextResponse } from 'next/server'
import { ErrorResponse, QuizData } from '@/src/lib/data_types'
import { Knowledge, knowledge } from '@/src/lib/knowledgeContracts'
import { getUserId } from '@/src/app/api/utils'
import { updatedKnowledgeBase } from '@/src/app/api/knowledge/knowledge'
import { knowledgeBaseToContract } from '@/src/app/api/mapper/knowledgeMapper'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest
): Promise<NextResponse<Knowledge | ErrorResponse>> {
  try {
    const userId = await getUserId()
    const parsedData = knowledge.safeParse(await req.json())
    if (!parsedData.success)
      throw new Error(parsedData.error.message, { cause: 400 })
    const data = await updatedKnowledgeBase(parsedData.data, userId)
    const parsedResponse = knowledgeBaseToContract(data)
    return NextResponse.json(parsedResponse, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
