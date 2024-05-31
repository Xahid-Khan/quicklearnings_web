import { NextRequest, NextResponse } from 'next/server'
import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'
import { ErrorResponse } from '@/src/lib/data_types'
import { getAllTopics } from '@/src/app/api/topic/topic'
import { dataToTopicOptions } from '@/src/app/api/mapper/topicMapper'
import { TopicDropDownArray } from '@/src/lib/topicContacts'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest
): Promise<NextResponse<TopicDropDownArray | ErrorResponse>> {
  try {
    const data = await getAllTopics({ subjectId: 'all' })
    const mappedData = dataToTopicOptions(data)
    return NextResponse.json(mappedData, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
