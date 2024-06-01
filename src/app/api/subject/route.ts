import { NextRequest, NextResponse } from 'next/server'
import { getAllSubjects } from './subject'
import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'
import { ErrorResponse } from '@/src/lib/data_types'
import { dataArrayToSubjectContract } from '../mapper/subjectMapper'
import { Subject } from '@/src/lib/subjectContracts'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest
): Promise<NextResponse<Subject[] | ErrorResponse>> {
  try {
    const data = await getAllSubjects()
    const mappedData = dataArrayToSubjectContract(data)
    return NextResponse.json(mappedData, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
