import { NextRequest, NextResponse } from 'next/server'
import { getDataByTopicId } from '@/src/app/api/data/data'
import { getPaginationParams } from '@/src/utils/utils'

export async function GET(
  req: NextRequest,
  { params }: { params: { topic_id: string } }
): Promise<NextResponse<QuizDataResponse>> {
  const { page, limit } = getPaginationParams(req)
  const { data, count } = await getDataByTopicId(params.topic_id, limit, page)
  return NextResponse.json(
    { data, count: Math.ceil(count / limit) },
    { status: 200 }
  )
}
