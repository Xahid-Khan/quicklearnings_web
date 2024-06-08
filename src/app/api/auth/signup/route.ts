import { signUpRequest } from '@/lib/authContracts'
import { getErrorResponseWithStatusCode } from '@/lib/errorHandler'
import getSupabaseInstance from '@/utils/config'
import { validateEmail, validatePassword } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const reqProps = signUpRequest.safeParse(await req.json())

    if (!reqProps.success) throw new Error('Invalid User Data', { cause: 400 })

    if (
      validateEmail(reqProps.data.email) &&
      validatePassword(reqProps.data.password)
    ) {
      const supabase = getSupabaseInstance()
      const { data, error } = await supabase.auth.signUp({
        email: reqProps.data.email,
        password: reqProps.data.password,
        options: {
          data: {
            first_name: reqProps.data.firstName,
            last_name: reqProps.data.lastName
          }
        }
      })
      if (error) {
        throw new Error(error.message, { cause: 502 })
      }

      return NextResponse.json({ data }, { status: 200 })
    }
    throw new Error('Either Email or Password is not valid', { cause: 400 })
  } catch (err) {
    return getErrorResponseWithStatusCode(err, req.nextUrl.pathname)
  }
}
