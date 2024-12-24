import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import { isNotEmpty } from '@inverter-network/sdk'

export const getBearerToken = (headers: Headers | ReadonlyHeaders) => {
  const token = headers.get('authorization')?.split(' ')[1]
  return token
}

export const splitBearerToken = (token: string) => {
  const [key, secret] = token.split(':')

  isNotEmpty(key || secret, 'Key or Secret is empty')

  return { key, secret }
}

export const getBearerConfig = (token?: string) => {
  if (!token) throw new Error('No token provided')

  const config: RequestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  }

  return config
}
