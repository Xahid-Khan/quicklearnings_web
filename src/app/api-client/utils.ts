type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
interface Config {
  readonly path: string
  readonly method: Method
  readonly body?: Record<string, unknown> | readonly unknown[]
}

export const routeRequestHandler = (config: Config): Promise<Response> => {
  const reqParams = {
    method: config.method,
    mode: 'same-origin' as const,
    credentials: 'same-origin' as const,
    cache: 'no-store' as const,
    headers: {
      'Content-Type': 'application/json'
    },
    ...(config.body ? { body: JSON.stringify(config.body) } : {})
  }
  const request = fetch(`/api/${config.path}`, reqParams)
  return request
}
