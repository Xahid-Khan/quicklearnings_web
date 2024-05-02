import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'
import getSupabaseInstance from '@/src/utils/config'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import {
  USER_SESSION_COOKIE_NAME,
  USER_TOKEN_COOKIE_NAME
} from '@/src/app/api/constants'
import { resetPasswordRequest } from '@/src/lib/authContracts'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const parsedReq = resetPasswordRequest.safeParse(await req.json())
    if (!parsedReq.success) {
      throw new Error(parsedReq.error.message, { cause: 400 })
    }
    const supabase = getSupabaseInstance()
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      parsedReq.data.email,
      { redirectTo: parsedReq.data.redirectTo }
    )
    console.log(parsedReq.data)
    console.log(data, error)

    return NextResponse.json({ message: 'logout successful' }, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
