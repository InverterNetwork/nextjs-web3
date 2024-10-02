import { NextRequest } from 'next/server'
import { isNotEmpty } from '@/types'

const get = (req: Request | NextRequest) => {
  const token = req.headers.get('authorization')?.split(' ')[1]
  return token
}

const split = (token: string) => {
  const [key, secret] = token.split(':')

  isNotEmpty(key || secret, 'Key or Secret is empty')

  return { key, secret }
}

const getConfig = (token?: string) => {
  if (!token) throw new Error('No token provided')

  const config: RequestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  }

  return config
}

export default {
  get,
  split,
  getConfig,
}
