import { NextRequest, NextResponse } from 'next/server'
import { getAllTopics } from '../topic'
import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import { ErrorResponse, Topic } from '@/lib/data_types'
import { TopicView } from '@/lib/topicContacts'
import { dataArrayToTopicContract } from '@/app/api/mapper/topicMapper'

export async function GET(
  req: NextRequest,
  { params }: { params: { subject_id: string } }
): Promise<NextResponse<TopicView[] | ErrorResponse>> {
  try {
    const data: Topic[] = await getAllTopics({
      subjectId: params.subject_id
    })
    const parsedData = dataArrayToTopicContract(data)
    return NextResponse.json(parsedData, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
