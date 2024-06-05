import { NextRequest, NextResponse } from 'next/server'
import { getAllSubjects } from '@/app/api/subject/subject'
import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import { ErrorResponse } from '@/lib/data_types'
import { dataToSubjectOptions } from '@/app/api/mapper/subjectMapper'
import { SubjectDropDownArray } from '@/lib/subjectContracts'
import { getUserId } from '@/app/api/utils'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest
): Promise<NextResponse<SubjectDropDownArray | ErrorResponse>> {
  try {
    const userId = await getUserId()
    const data = await getAllSubjects({
      currentUserId: userId,
      showPublic: false
    })
    const mappedData = dataToSubjectOptions(data)
    return NextResponse.json(mappedData, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
