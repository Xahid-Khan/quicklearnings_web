import { NextRequest, NextResponse } from 'next/server'
import { getAllSubjects } from './subject'
import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'
import { ErrorResponse, Subject } from '@/src/lib/data_types'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest
): Promise<NextResponse<Subject[] | ErrorResponse>> {
  try {
    const data: Subject[] = await getAllSubjects()
    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
