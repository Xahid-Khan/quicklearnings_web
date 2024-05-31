import { NextRequest, NextResponse } from 'next/server'
import { ErrorResponse } from '@/src/lib/data_types'
import { getUserId } from '@/src/app/api/utils'
import { getKnowledgeDataById } from '@/src/app/api/knowledge/knowledge'
import { knowledgeBaseToContract } from '../../../mapper/knowledgeMapper'
import { Knowledge } from '@/src/lib/knowledgeContracts'
import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { knowledge_id: string } }
): Promise<NextResponse<Knowledge | ErrorResponse>> {
  try {
    const userId = await getUserId()
    const data = await getKnowledgeDataById(params.knowledge_id, userId)
    const parsedData = knowledgeBaseToContract(data)
    return NextResponse.json(parsedData, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
