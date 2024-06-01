import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'
import { NextRequest, NextResponse } from 'next/server'
import { updateNewSubject } from '../subject'
import { editSubject, Subject } from '@/src/lib/subjectContracts'
import { ErrorResponse } from '@/src/lib/data_types'
import { dataToSubjectContract } from '@/src/app/api/mapper/subjectMapper'

export const dynamic = 'force-dynamic'

export async function PATCH(
  req: NextRequest
): Promise<NextResponse<Subject | ErrorResponse>> {
  try {
    const parsedData = editSubject.safeParse(await req.json())
    if (!parsedData.success)
      throw new Error(parsedData.error.message, { cause: 400 })
    const data = await updateNewSubject({ ...parsedData.data })

    const parsedResponse = dataToSubjectContract(data)
    return NextResponse.json(parsedResponse, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
