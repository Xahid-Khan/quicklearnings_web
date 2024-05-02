import { NextRequest, NextResponse } from 'next/server'
import { getAllTopics } from '../topic'
import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'
import { ErrorResponse, Topic } from '@/src/lib/data_types'

export async function GET(
  req: NextRequest,
  { params }: { params: { subject_id: string } }
): Promise<NextResponse<Topic[] | ErrorResponse>> {
  try {
    const data: Topic[] = await getAllTopics({
      subject_id: params.subject_id
    })
    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
