import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'
import { NextRequest, NextResponse } from 'next/server'
import { ErrorResponse } from '@/src/lib/data_types'
import { deleteTopicById } from '@/src/app/api/topic/topic'
import { getUserId } from '@/src/app/api/utils'

export const dynamic = 'force-dynamic'

interface DeleteTopicProps {
  topicId: number
}

export async function DELETE(
  req: NextRequest
): Promise<NextResponse<true | ErrorResponse>> {
  try {
    const parsedData = (await req.json()) as DeleteTopicProps
    const userId = await getUserId()
    if (!parsedData.topicId)
      throw new Error('Invalid Data Type Provided', { cause: 400 })
    const data = await deleteTopicById(parsedData.topicId, userId)
    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
