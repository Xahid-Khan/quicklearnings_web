import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import { NextRequest, NextResponse } from 'next/server'
import { ErrorResponse } from '@/lib/data_types'
import { getUserId } from '@/app/api/utils'
import { deleteSubjectById } from '@/app/api/subject/subject'

export const dynamic = 'force-dynamic'

interface DeleteTopicProps {
  subjectId: number
}

export async function DELETE(
  req: NextRequest
): Promise<NextResponse<true | ErrorResponse>> {
  try {
    const parsedData = (await req.json()) as DeleteTopicProps
    const userId = await getUserId()
    if (!parsedData.subjectId)
      throw new Error('Invalid Data Type Provided', { cause: 400 })
    const data = await deleteSubjectById(parsedData.subjectId, userId)
    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
