import { NextRequest, NextResponse } from 'next/server'
import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import { ErrorResponse } from '@/lib/data_types'
import { getAllTopics } from '@/app/api/topic/topic'
import { dataToTopicOptions } from '@/app/api/mapper/topicMapper'
import { TopicDropDownArray } from '@/lib/topicContacts'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest
): Promise<NextResponse<TopicDropDownArray | ErrorResponse>> {
  try {
    const userId = await getUserId()
    const data = await getAllTopics({ subjectId: 'all', currentUserId: userId })
    const mappedData = dataToTopicOptions(data)
    return NextResponse.json(mappedData, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
