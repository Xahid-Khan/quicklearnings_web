import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { USER_TOKEN_COOKIE_NAME } from '@/app/api/constants'
import { getUserByToken } from '@/app/api/auth/auth'
export async function middleware(req: NextRequest): Promise<NextResponse> {
  const token = cookies().get(USER_TOKEN_COOKIE_NAME)?.value
  const userData = token ? await getUserByToken() : undefined

  if (!userData) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  const res = NextResponse.next({ headers: req.headers })
  return res
}

export const config = {
  matcher: ['/account', '/quiz/:path*', '/knowledge/form']
}
