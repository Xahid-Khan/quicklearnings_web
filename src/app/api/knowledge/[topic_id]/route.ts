import { NextRequest, NextResponse } from 'next/server'
import { getKnowledgeDisplayDataByTopicId } from '@/app/api/knowledge/knowledge'
import { getPaginationParams } from '@/utils/utils'
import { knowledgeBaseArrayToContract } from '@/app/api/mapper/knowledgeMapper'
import { KnowledgeDataResponse } from '@/lib/knowledgeContracts'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { topic_id: string } }
): Promise<NextResponse<KnowledgeDataResponse>> {
  const { page, limit } = getPaginationParams(req)
  const { data, count } = await getKnowledgeDisplayDataByTopicId(
    params.topic_id,
    limit,
    page
  )

  const parsedResponse = knowledgeBaseArrayToContract(data)
  return NextResponse.json(
    { data: parsedResponse, count: Math.ceil(count / limit) },
    { status: 200 }
  )
}
