import { NextRequest, NextResponse } from 'next/server'
import { getAllLanguages } from './language'
import { getErrorResponseWithStatusCode } from '@/src/lib/errorHander'
import { ErrorResponse, Language } from '@/src/lib/data_types'

export async function GET(
  req: NextRequest
): Promise<NextResponse<Language[] | ErrorResponse>> {
  try {
    const data: Language[] = await getAllLanguages()
    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
