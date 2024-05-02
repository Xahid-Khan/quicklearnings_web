import { routeRequestHandler } from '@/src/app/api-client/utils'
import { UserSession } from '@/src/lib/data_types'

export const getUserQuery = async (): Promise<UserSession | null> => {
  const response: Response = await routeRequestHandler({
    method: 'GET',
    path: '/auth/get_user'
  })
  if (response.ok) {
    return (await response.json()) as UserSession
  }
  return null
}
