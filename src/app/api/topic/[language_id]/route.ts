import { NextRequest, NextResponse } from 'next/server'
import { getAllTopics } from '../topic'
import { getErrorResponseWithStatusCode } from '@/src/lib/errorHander'

export async function GET(
  req: NextRequest,
  { params }: { params: { language_id: string } }
): Promise<NextResponse<Topic[] | ErrorResponse>> {
  try {
    const data: Topic[] = await getAllTopics({
      language_id: params.language_id
    })
    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
