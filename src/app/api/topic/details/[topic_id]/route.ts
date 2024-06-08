import { NextRequest, NextResponse } from 'next/server'
import { getAllTopics } from '@/app/api/topic/topic'
import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import { ErrorResponse, Topic } from '@/lib/data_types'
import { TopicView } from '@/lib/topicContacts'
import { dataToTopicContract } from '@/app/api/mapper/topicMapper'

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
