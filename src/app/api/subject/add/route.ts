import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'
import { NextRequest, NextResponse } from 'next/server'
import { insertNewSubject } from '../subject'
import { addSubject, subject, Subject } from '@/src/lib/subjectContracts'
import { ErrorResponse } from '@/src/lib/data_types'
import { dataToSubjectContract } from '@/src/app/api/mapper/subjectMapper'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest
): Promise<NextResponse<Subject | ErrorResponse>> {
  try {
    const parsedData = addSubject.safeParse(await req.json())
    if (!parsedData.success)
      throw new Error(parsedData.error.message, { cause: 400 })
    const data = await insertNewSubject({ ...parsedData.data })
    const parsedResponse = dataToSubjectContract(data)
    return NextResponse.json(parsedResponse, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
