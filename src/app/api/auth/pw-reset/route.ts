import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import getSupabaseInstance from '@/utils/config'
import { NextRequest, NextResponse } from 'next/server'
import { resetPasswordRequest } from '@/lib/authContracts'

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

    return NextResponse.json({ message: 'logout successful' }, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
