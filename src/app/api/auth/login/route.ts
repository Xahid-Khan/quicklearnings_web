import { getErrorResponseWithStatusCode } from '@/src/lib/errorHandler'
import getSupabaseInstance from '@/src/utils/config'
import { validateEmail, validatePassword } from '@/src/utils/utils'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import {
  USER_SESSION_COOKIE_NAME,
  USER_TOKEN_COOKIE_NAME
} from '@/src/app/api/constants'
import { ErrorResponse, UserSession } from '@/src/lib/data_types'
import { loginRequest } from '@/src/lib/authContracts'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest
): Promise<NextResponse<UserSession | ErrorResponse>> {
  try {
    const reqProps = loginRequest.safeParse(await req.json())
    if (!reqProps.success)
      throw new Error('Invalid User Data, please try again!', { cause: 400 })
    const supabase = getSupabaseInstance()

    if (
      validateEmail(reqProps.data.email) &&
      validatePassword(reqProps.data.password)
    ) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: reqProps.data.email,
        password: reqProps.data.password
      })
      if (error) {
        if (error.message === 'Invalid login credentials') {
          throw new Error('Either email or password is not valid', {
            cause: 400
          })
        } else {
          throw new Error(error.message, { cause: 502 })
        }
      }
      cookies().delete(USER_TOKEN_COOKIE_NAME)
      cookies().delete(USER_SESSION_COOKIE_NAME)
      cookies().set({
        name: USER_TOKEN_COOKIE_NAME,
        value: data.session.access_token,
        httpOnly: true,
        secure: true
      })
      cookies().set({
        name: USER_SESSION_COOKIE_NAME,
        value: JSON.stringify(data.session),
        httpOnly: true,
        secure: true
      })
      return NextResponse.json(
        { session: data.session, userId: data.user.id },
        { status: 200 }
      )
    }
    throw new Error('Either email or password is not valid', { cause: 400 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
