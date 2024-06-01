import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'
import { NextRequest, NextResponse } from 'next/server'
import { ErrorResponse } from '@/src/lib/data_types'
import { addTopic, TopicView } from '@/src/lib/topicContacts'
import { dataToTopicContract } from '@/src/app/api/mapper/topicMapper'
import { insertNewTopic } from '@/src/app/api/topic/topic'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest
): Promise<NextResponse<TopicView | ErrorResponse>> {
  try {
    const parsedData = addTopic.safeParse(await req.json())
    if (!parsedData.success)
      throw new Error(parsedData.error.message, { cause: 400 })
    const data = await insertNewTopic({ ...parsedData.data })
    const parsedResponse = dataToTopicContract(data)
    return NextResponse.json(parsedResponse, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
