import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import { NextRequest, NextResponse } from 'next/server'
import { ErrorResponse } from '@/lib/data_types'
import { updateNewTopic } from '@/app/api/topic/topic'
import { editTopic, TopicView } from '@/lib/topicContacts'
import { dataToTopicContract } from '@/app/api/mapper/topicMapper'
import { getUserId } from '@/app/api/utils'

export const dynamic = 'force-dynamic'

export async function PATCH(
  req: NextRequest
): Promise<NextResponse<TopicView | ErrorResponse>> {
  try {
    const userId = await getUserId()
    const parsedData = editTopic.safeParse(await req.json())
    if (!parsedData.success)
      throw new Error(parsedData.error.message, { cause: 400 })
    const data = await updateNewTopic({ ...parsedData.data }, userId)

    const parsedResponse = dataToTopicContract(data)
    return NextResponse.json(parsedResponse, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
