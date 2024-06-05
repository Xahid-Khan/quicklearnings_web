import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import { NextRequest, NextResponse } from 'next/server'
import { updateNewSubject } from '../subject'
import { editSubject, Subject } from '@/lib/subjectContracts'
import { ErrorResponse } from '@/lib/data_types'
import { dataToSubjectContract } from '@/app/api/mapper/subjectMapper'

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
