import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'
import getSupabaseInstance from '@/src/utils/config'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import {
  USER_SESSION_COOKIE_NAME,
  USER_TOKEN_COOKIE_NAME
} from '@/src/app/api/constants'

export const dynamic = 'force-dynamic'

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const supabase = getSupabaseInstance()
    const token = cookies().get(USER_TOKEN_COOKIE_NAME)?.value
    if (token) {
      supabase.auth.admin.signOut(token)
      cookies().delete(USER_TOKEN_COOKIE_NAME)
    }
    const session = cookies().get(USER_SESSION_COOKIE_NAME)?.value
    if (session) {
      cookies().delete(USER_SESSION_COOKIE_NAME)
    }
    return NextResponse.json({ message: 'logout successful' }, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
