import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import {
  USER_SESSION_COOKIE_NAME,
  USER_TOKEN_COOKIE_NAME
} from '@/src/app/api/constants'
import { getSessionByToken, getUserByToken } from '@/src/app/api/auth/auth'
import { ErrorResponse, UserSession } from '@/src/lib/data_types'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest
): Promise<NextResponse<UserSession | ErrorResponse>> {
  try {
    const token = cookies().get(USER_TOKEN_COOKIE_NAME)?.value
    const session = cookies().get(USER_SESSION_COOKIE_NAME)?.value
    if (token && session) {
      const userData = await getUserByToken(token)
      return NextResponse.json(
        { userId: userData.user.id, session: JSON.parse(session) },
        { status: 200 }
      )
    }
    return NextResponse.json({ userId: null, session: null }, { status: 200 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
