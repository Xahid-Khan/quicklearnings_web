import { NextResponse } from 'next/server'

export const getErrorResponseWithStatusCode = (
  err: unknown,
  route: string
): NextResponse<ErrorResponse> => {
  let message = ''
  let errorCode
  if (err instanceof Error) {
    message = err.message
    errorCode = Number(err.cause)
  } else {
    message = `${String(err)}`
  }
  console.error(`Code: ${errorCode} - ${message} - ROUTE: ${route}`)
  return NextResponse.json({ message }, { status: errorCode ?? 500 })
}
