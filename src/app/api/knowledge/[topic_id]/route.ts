import { NextRequest, NextResponse } from 'next/server'
import { getKnowledgeDisplayDataByTopicId } from '@/src/app/api/knowledge/knowledge'
import { getPaginationParams } from '@/src/utils/utils'
import { QuizDataResponse } from '@/src/lib/data_types'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { topic_id: string } }
): Promise<NextResponse<QuizDataResponse>> {
  const { page, limit } = getPaginationParams(req)
  const { data, count } = await getKnowledgeDisplayDataByTopicId(
    params.topic_id,
    limit,
    page
  )
  return NextResponse.json(
    { data, count: Math.ceil(count / limit) },
    { status: 200 }
  )
}
