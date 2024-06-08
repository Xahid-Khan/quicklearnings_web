import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import { NextRequest, NextResponse } from 'next/server'
import { ErrorResponse } from '@/lib/data_types'
import { addTopic, TopicView } from '@/lib/topicContacts'
import { dataToTopicContract } from '@/app/api/mapper/topicMapper'
import { insertNewTopic } from '@/app/api/topic/topic'
import { getUserId } from '@/app/api/utils'
import { getAllSubjects } from '../../subject/subject'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest
): Promise<NextResponse<TopicView | ErrorResponse>> {
  try {
    const userId = await getUserId()
    const parsedData = addTopic.safeParse(await req.json())
    if (!parsedData.success)
      throw new Error(parsedData.error.message, { cause: 400 })
    const subjectData = await getAllSubjects({
      subjectId: parsedData.data.subjectId
    })
    if (subjectData[0].user_id != userId) {
      throw new Error('You are not authorised to add new topic here.', {
        cause: 401
      })
    }
    const data = await insertNewTopic({ ...parsedData.data }, userId)
    const parsedResponse = dataToTopicContract(data)
    return NextResponse.json(parsedResponse, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
