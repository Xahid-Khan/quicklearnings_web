import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import { NextRequest, NextResponse } from 'next/server'
import { ErrorResponse } from '@/lib/data_types'
import { deleteTopicById } from '@/app/api/topic/topic'
import { getUserId } from '@/app/api/utils'
import { deleteKnowledgeById } from '../knowledge'

export const dynamic = 'force-dynamic'

interface DeleteKnowledgeProps {
  knowledgeId: number
}

export async function DELETE(
  req: NextRequest
): Promise<NextResponse<true | ErrorResponse>> {
  try {
    const parsedData = (await req.json()) as DeleteKnowledgeProps
    const userId = await getUserId()
    if (!parsedData.knowledgeId)
      throw new Error('Invalid Data Type Provided', { cause: 400 })
    const data = await deleteKnowledgeById(parsedData.knowledgeId, userId)
    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
