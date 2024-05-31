import { NextRequest, NextResponse } from 'next/server'
import { getAllTopics } from '@/src/app/api/topic/topic'
import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'
import { ErrorResponse, Topic } from '@/src/lib/data_types'
import { TopicView } from '@/src/lib/topicContacts'
import { dataToTopicContract } from '@/src/app/api/mapper/topicMapper'

export async function GET(
  req: NextRequest,
  { params }: { params: { topic_id: string } }
): Promise<NextResponse<TopicView | ErrorResponse>> {
  try {
    const data: Topic[] = await getAllTopics({
      subjectId: 'all',
      topicId: params.topic_id
    })
    const parsedData = dataToTopicContract(data[0])
    return NextResponse.json(parsedData, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
