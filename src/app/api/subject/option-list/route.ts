import { NextRequest, NextResponse } from 'next/server'
import { getAllSubjects } from '@/src/app/api/subject/subject'
import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'
import { ErrorResponse } from '@/src/lib/data_types'
import { dataToSubjectOptions } from '@/src/app/api/mapper/subjectMapper'
import { SubjectDropDownArray } from '@/src/lib/subjectContracts'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest
): Promise<NextResponse<SubjectDropDownArray | ErrorResponse>> {
  try {
    const data = await getAllSubjects()
    const mappedData = dataToSubjectOptions(data)
    return NextResponse.json(mappedData, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
