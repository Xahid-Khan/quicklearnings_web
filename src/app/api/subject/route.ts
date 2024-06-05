import { NextRequest, NextResponse } from 'next/server'
import { getAllSubjects } from './subject'
import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import { ErrorResponse } from '@/lib/data_types'
import { dataArrayToSubjectContract } from '../mapper/subjectMapper'
import { Subject } from '@/lib/subjectContracts'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest
): Promise<NextResponse<Subject[] | ErrorResponse>> {
  try {
    const data = await getAllSubjects({})
    const mappedData = dataArrayToSubjectContract(data)
    return NextResponse.json(mappedData, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
